'use strict';

const {
    utils: {
        doOperationInQueue,
        javascript: {
            getQueueId
        },
        stringify,
        aws: {
            dino: {
                // getDatabaseEntry,
                updateDatabaseEntry,
            },
        },
    },
} = require( '@bitcoin-api.io/common-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: { EXCHANGE_USERS }
            }
        },
    }
} = require( '@bitcoin-api.io/common-exchange' );

const {
    exchangeUsers: {
        getIfExchangeUserExists
    },
    aws: {
        dino: {
            getExchangeDatabaseEntry,
        }
    }
} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    email,
    password,
    verifyEmailCode,
    ipAddress,
    exchangeUserId,
    
}) => {

    console.log(
        
        'running verifyUserEmail ' +
        `with the following values - ${ stringify({

            email,
            password,
            verifyEmailCode,
            ipAddress,
            exchangeUserId,
        }) }`
    );

    await doOperationInQueue({
        queueId: getQueueId({ type: EXCHANGE_USERS, id: exchangeUserId }),
        doOperation: async () => {
            await doOperationInQueue({
                queueId: getQueueId({ type: EXCHANGE_USERS, id: email }),
                doOperation: async () => {

                    const exchangeUserExists = await getIfExchangeUserExists({

                        email,
                    });

                    if( exchangeUserExists ) {

                        const error = new Error(
                            `user with email ${ email } already exists`
                        );
                        error.statusCode = 409;
                        error.bulltrue = true;
                        throw error;
                    }

                    const exchangeUser = await getExchangeDatabaseEntry({
                        
                        tableName: EXCHANGE_USERS,
                        value: exchangeUserId
                    });

                    const newExchangeUser = Object.assign(
                        {},
                        exchangeUser,
                        {
                            email,
                            metadata: Object.assign(
                                {},
                                exchangeUser.metadata,
                                {
                                    verification: {
                                        date: Date.now(),
                                        ipAddress,
                                        emailMessageId: (
                                            exchangeUser.emailMessageId
                                        ),
                                        emailToVerify: (
                                            exchangeUser.emailToVerify
                                        ),
                                    }
                                }
                            )
                        }
                    );

                    delete newExchangeUser.emailToVerify;
                    delete newExchangeUser.verifyEmailCode;
                    delete newExchangeUser.emailMessageId;
                
                    await updateDatabaseEntry({
                
                        tableName: EXCHANGE_USERS,
                        entry: newExchangeUser,
                    });
                }
            });
        },
    });

    const responseValues = {};

    console.log(
        
        'verifyUserEmail executed successfully - ' +
        `returning values: ${ stringify( responseValues ) }`
    );

    return responseValues;
});
