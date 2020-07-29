'use strict';

// const uuidv4 = require( 'uuid/v4' );

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        stringify
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

const getLoginTokenId = require( '../javascript/loginTokenIdTools/getLoginTokenId' );
const getHashedPassword = require( '../javascript/getHashedPassword' );
let xoOvo;

const {
    loginTokens: {
        expiryTime
    }
} = require( '../constants' );

const oneDay = expiryTime;


module.exports = Object.freeze( async ({

    exchangeUserId,
    ipAddress,
    
}) => {

    console.log(
        `running createLoginToken
            with the following values - ${
                stringify({
                    exchangeUserId,
                    ipAddress
                })
        }`
    );

    const loginTokenId = getLoginTokenId();

    const hashedLoginTokenId = getHashedPassword({

        password: loginTokenId
    });

    if( !xoOvo ) {

        xoOvo = require( '../../sacredElementals/crypto/xoOvo' );
    }

    const powerLoginTokenId = xoOvo({

        text: hashedLoginTokenId,
    });

    const thePowerOfNow = Date.now();

    const loginToken = {

        exchangeUserId,
        expiryTime: thePowerOfNow + oneDay,
        ipAddress,
        creationDate: thePowerOfNow,
        loginTokenId: powerLoginTokenId,
    };

    await updateDatabaseEntry({

        tableName: LOGIN_TOKENS,
        entry: loginToken,
    });

    const createLoginTokenResults = {

        loginToken: loginTokenId,
    };

    console.log(
        
        'createLoginToken executed successfully - ' +
        `returning create login token results: ${
            stringify( createLoginTokenResults )
        }`
    );

    return createLoginTokenResults;
});
