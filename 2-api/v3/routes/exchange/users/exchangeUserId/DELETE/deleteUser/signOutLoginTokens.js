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
} = require( '@npm.m.stecky.efantis/commonprivate' );

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
} = require( '@npm.m.stecky.efantis/common-exchange' );

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
