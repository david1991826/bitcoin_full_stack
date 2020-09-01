'use strict';

const {
    utils: {
        doOperationInQueue,
        stringify,
        javascript: {
            getQueueId
        },
    }
} = require( '@bitcoin-api.io/common-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS
                }
            }
        }
    }
} = require( '@bitcoin-api.io/common-exchange' );

const validateAndGetExchangeUser = require( './validateAndGetExchangeUser' );
const signOutLoginTokens = require( './signOutLoginTokens' );
const signOutExchangeUser = require( './signOutExchangeUser' );


const deleteUserCore = Object.freeze( async ({

    exchangeUserId,
    loginTokens,
    ipAddress,

}) => {

    const exchangeUser = await validateAndGetExchangeUser({

        exchangeUserId,
    });

    await signOutLoginTokens({

        loginTokens,
        ipAddress,
    });

    await signOutExchangeUser({

        exchangeUser,
        ipAddress,
    });
});


module.exports = Object.freeze( async ({

    ipAddress,
    exchangeUserId,
    loginTokens,

}) => {
    
    console.log(
        'running the deleteUser ' +
        `with the following values: ${ stringify({

            exchangeUserId,
            ipAddress,
        })}`
    );

    await doOperationInQueue({
        queueId: getQueueId({ type: EXCHANGE_USERS, id: exchangeUserId }),
        doOperation: async () => {

            return await deleteUserCore({

                exchangeUserId,
                loginTokens,
                ipAddress,
            });
        }
    });

    const responseData = {};

    console.log(
        
        'the exchange deleteUser executed successfully: ' +
        stringify({ responseData })
    );

    return responseData;
});