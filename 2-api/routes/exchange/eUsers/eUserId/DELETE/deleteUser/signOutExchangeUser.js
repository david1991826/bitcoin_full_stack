'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        // stringify
    },
} = require( '@bitcoin-api.io/common-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS
                },
            }
        }
    }
} = require( '@bitcoin-api.io/common-exchange' );


module.exports = Object.freeze( async ({

    exchangeUser,
    ipAddress,

}) => {

    console.log( 'running signOutExchangeUser' );

    const signedOutExchangeUser = Object.assign(

        {},
        exchangeUser,
        {
            metadata: Object.assign(

                {},
                exchangeUser.metadata,
                {
                    deletion: {
                        date: Date.now(),
                        ipAddress,
                        email: exchangeUser.email,
                    },
                }
            )
        }
    );

    delete signedOutExchangeUser.email;
    delete signedOutExchangeUser.emailToVerify;

    await updateDatabaseEntry({

        tableName: EXCHANGE_USERS,
        entry: signedOutExchangeUser,
    });

    console.log( 'signOutLoginTokens executed successfully' );
});
