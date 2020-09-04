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
} = require( '@bitcoin-api/full-stack-api' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    LOGIN_TOKENS
                },
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange' );

const {
    loginTokens: {
        getSignedOutLoginToken
    }
} = require( '../../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    ipAddress,
    loginTokens,

}) => {

    console.log( 'running signOutLoginTokens' );
    
    for( const loginToken of loginTokens ) {

        if( !loginToken.signedOut ) {

            const signedOutLoginToken = getSignedOutLoginToken({

                loginToken,
                ipAddress,
                otherKeyValues: {
                    isDeleteUserSignedOut: true,
                }
            });
            
            console.log(
                'signing out token with id: ' +
                signedOutLoginToken.loginTokenId
            );

            await updateDatabaseEntry({

                tableName: LOGIN_TOKENS,
                entry: signedOutLoginToken,
            });
        }
    }

    console.log( 'signOutLoginTokens executed successfully' );
});
