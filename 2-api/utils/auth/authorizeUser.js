'use strict';

const {
    
    aws: { database: { tableNames: { USERS } } }

} = require( '../constants' );

const { Crypto } = require( '../javascript' );

// const { NotAuthorizedError } = require( '../errors' );
const {
    
    getDecodedReturnCode, getTemplarCode

} = require( '../accessCodeTools' );
const validateReturnCode = require( '../validation/validateReturnCode' );

const {

    utils: { aws: { dino: { getDatabaseEntry } } }

} = require( '@bitcoin-api.io/common-private' );


module.exports = Object.freeze( async ({

    returnCode

}) => {

    console.log( '🛡Running Authorize User🛡' );

    await validateReturnCode({ returnCode });

    const decodedReturnCode = getDecodedReturnCode({ returnCode });

    const userFromDatabase = await getDatabaseEntry({

        value: decodedReturnCode.userId,
        tableName: USERS,
    });

    if( !userFromDatabase ) {

        const errorMessage = (
            'ERROR: utils.auth.authorizeUser error: ' +
            'invalid userId found in return code: ' +
            returnCode
        );

        console.log( errorMessage );
        
        const err = new Error( 'unauthorized' );
        err.statusCode = 401;
        err.bulltrue = true;
        throw err;
    }

    const templarCodeFromRequest = getTemplarCode({

        megaCode: decodedReturnCode.megaCode
    });

    const templarCodeFromDatabase = Crypto.decrypt({

        text: userFromDatabase.accessCode,
        encryptionId: userFromDatabase.encryptionId
    });

    const theReturnCodeDoesNotHaveTheCorrectMegaCode = (

        templarCodeFromRequest !== templarCodeFromDatabase
    );

    if( theReturnCodeDoesNotHaveTheCorrectMegaCode ) {

        const errorMessage = (
            '👁🔻ERROR🚩🚩🔻🐙: WARNING: WOW: ' +
            'utils.auth.authorizeUser error: ' +
            'invalid mega code found in return code🔻👁: ' +
            returnCode
        );

        console.log( errorMessage );

        const err = new Error( 'unauthorized' );
        err.statusCode = 401;
        err.bulltrue = true;
        throw err;
    }

    console.log( '🦕🛡User is Authorized🛡🦖' );

    const returnValues = {
        
        user: userFromDatabase
    };

    return returnValues;
});
