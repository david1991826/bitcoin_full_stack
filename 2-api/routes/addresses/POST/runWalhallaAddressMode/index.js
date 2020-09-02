'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        doOperationInQueue,
        stringify,
        redis: {
            doRedisFunction,
            doRedisRequest,
        },
        javascript: {
            getQueueId,
            jsonEncoder: {
                decodeJson
            }
        },
    },
    constants: {
        redis: {
            listIds,
        },
        aws: {
            database: {
                tableNames: {
                    ADDRESSES,
                }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS,
                }
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange' );

const {
    aws: {
        dino: {
            getExchangeDatabaseEntry
        }
    }
} = require( '../../../../exchangeUtils' );

const {
    auth: {
        authorizeUser
    },
} = require( '../../../../utils' );


module.exports = Object.freeze( async ({

    // user
    event,

}) => {

    const exchangeUserId = event.body.exchangeUserId;
    
    const eventHeaders = (
        !!event.headers &&
        event.headers
    ) || {};

    const megaCode = (
        
        eventHeaders.Token ||
        eventHeaders.token ||
        null
    );

    console.log(
        
        'running 🏛runWalhallaAddressMode🏛 ' +
        `with the following values: ${ stringify({

            exchangeUserId,
            ['there is a mega code']: !!megaCode,
        }) }`
    );

    const exchangeTokenUserId = process.env.EXCHANGE_TOKEN_USER_ID;

    if( !exchangeTokenUserId ) {

        throw new Error(
            
            '🏛runWalhallaAddressMode🏛 error - ' +
            'operational error: missing EXCHANGE_TOKEN_USER_ID'
        );
    }

    const { user } = await authorizeUser({

        returnCode: megaCode
    });

    if( exchangeTokenUserId !== user.userId ) {

        throw new Error(
            
            '🏛runWalhallaAddressMode🏛 error - ' +
            'operational error: invalid mega code provided'
        );
    }

    await doOperationInQueue({
        
        queueId: getQueueId({
            
            type: EXCHANGE_USERS,
            id: exchangeUserId
        }),
        
        doOperation: async () => {

            const exchangeUser = await getExchangeDatabaseEntry({
        
                tableName: EXCHANGE_USERS,
                value: exchangeUserId,
            });
        
            if( !exchangeUser ) {
        
                throw new Error(
                    '🏛runWalhallaAddressMode🏛 error - ' +
                    'exchange user with id ' +
                    `"${ exchangeUserId }" does not exist`
                );
            }

            const unusedAddressData = await doRedisFunction({

                performFunction: async ({

                    redisClient
            
                }) => {

                    const rawUnusedAddressData = await doRedisRequest({

                        client: redisClient,
                        command: 'rpop',
                        redisArguments: [
                            listIds.unusedAddressData
                        ],
                    });

                    if( !rawUnusedAddressData ) {

                        return null;
                    }

                    const unusedAddressData = decodeJson(

                        rawUnusedAddressData
                    );

                    return unusedAddressData;
                },

                functionName: 'getting fresh address',
            });

            if( !unusedAddressData ) {

                return console.log(

                    '🏛runWalhallaAddressMode🏛 NO-OP - ' +
                    'no fresh addresses available'
                );
            }

            const newMoneyData = Object.assign(

                {},
                exchangeUser.moneyData || {}
            );

            if( !newMoneyData.bitcoin ) {

                newMoneyData.bitcoin = [];
            }

            const newBitcoinMoneyDatum = {

                amount: 0,
                address: unusedAddressData.address,
                creationDate: Date.now(),
            };

            newMoneyData.bitcoin.push( newBitcoinMoneyDatum );

            const newExchangeUser = Object.assign(

                {},
                exchangeUser,
                {
                    moneyData: newMoneyData
                }
            );

            const updates = [];

            const updateExchangeUser = updateDatabaseEntry({

                tableName: EXCHANGE_USERS,
                entry: newExchangeUser,
            });

            updates.push( updateExchangeUser );

            const newAddressDatum = Object.assign(
                {},
                unusedAddressData,
                {
                    userId: process.env.EXCHANGE_TOKEN_USER_ID,
                    conversionDate: Date.now(),
                    isExchangeAddress: true,
                    exchangeUserId,
                }
            );
    
            const createAddressDatabaseEntry = updateDatabaseEntry({
    
                tableName: ADDRESSES,
                entry: newAddressDatum,
            });

            updates.push( createAddressDatabaseEntry );

            await Promise.all( updates );
        }
    });

    console.log(
        
        '🏛runWalhallaAddressMode🏛 executed successfully'
    );
});
