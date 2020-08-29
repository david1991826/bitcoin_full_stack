'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        stringify
    },
} = require( '@bitcoin-api.io/common-private' );

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
} = require( '@bitcoin-api.io/common-exchange' );

const {

    loginTokens: {
        getSignedOutLoginToken
    }

} = require( '../../../../../exchangeUtils' );

let xoOvoDecrypt;


module.exports = Object.freeze( async ({

    exchangeUserId,
    hashedLoginTokenIdFromRequestHeader,
    ipAddress,
    signedInLoginTokens,

}) => {
    
    console.log(
        'running the deleteLogins function with the following values: ' +
        stringify({
            exchangeUserId,
            hashedLoginTokenIdFromRequestHeader,
            ipAddress,
            ['number of login tokens']: signedInLoginTokens.length,
        })
    );

    if( !xoOvoDecrypt ) {

        xoOvoDecrypt = require(
            // '../../sacredElementals/crypto/xoOvoDecrypt'
            '../../../../../sacredElementals/crypto/xoOvoDecrypt'
        );
    }
    
    const rawLoginTokenToConsider = signedInLoginTokens.filter( ({

        loginTokenId,

    }) => {

        const hashedLoginTokenIdFromDatabase = xoOvoDecrypt({

            text: loginTokenId
        });

        return (
            hashedLoginTokenIdFromRequestHeader ===
            hashedLoginTokenIdFromDatabase
        );
    });

    if( rawLoginTokenToConsider.length !== 1 ) {
        // safeguard: shouldn't get here in normal operation

        throw new Error(
            'weird error in finding appropriate token'
        );
    }

    const loginToken = rawLoginTokenToConsider[0];

    console.log(
        'deleteLogouts signing out the following token: ' +
        stringify( loginToken )
    );

    const signedOutLoginToken = getSignedOutLoginToken({

        loginToken,
        ipAddress,
    });

    await updateDatabaseEntry({

        tableName: LOGIN_TOKENS,
        entry: signedOutLoginToken,
    });
        
    const deleteLoginResults = {

        // loginTokens
    };

    console.log(
        
        'deleteLogins executed successfully: returning results ' +
        stringify( deleteLoginResults )
    );

    return deleteLoginResults;
});