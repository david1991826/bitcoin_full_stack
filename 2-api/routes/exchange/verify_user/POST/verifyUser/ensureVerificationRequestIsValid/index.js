'use strict';

const {
    utils: {
        stringify,
        // aws: {
        //     dino: {
        //         getDatabaseEntry,
        //     },
        // },
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

const verifyEmailMessageIdIsValid = require( './verifyEmailMessageIdIsValid' );

const {
    aws: {
        dino: {
            getExchangeDatabaseEntry
        }
    },
    javascript: {
        getHashedPassword,
        getExchangeUserIdData,
        verificationCodeTools: {
            // getVerificationCode,
            getVerificationCodeComponents,
        }
    },
} = require( '../../../../../../exchangeUtils' );

const flamingoCrescentDecrypt = require( '../../../../../../sacredElementals/crypto/flamingoCrescentDecrypt' );


module.exports = Object.freeze( async ({

    email,
    password,
    verifyEmailCode
    
}) => {

    console.log(
        
        'running ensureVerificationRequestIsValid ' +
        `with the following values - ${ stringify({

            email,
            password,
            verifyEmailCode
        }) }`
    );

    const {

        baseId,
        expiryDate

    } = getVerificationCodeComponents({

        verificationCode: verifyEmailCode
    });

    if( Date.now() > expiryDate ) {

        const error = new Error(
            'The provided email verification link has been expired. ' +
            'Please try creating your ' +
            'account again. Sorry for any inconvenience.'
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    const {

        exchangeUserId,

    } = getExchangeUserIdData({
        
        baseId
    });

    const exchangeUser = await getExchangeDatabaseEntry({
        value: exchangeUserId,
        tableName: EXCHANGE_USERS,
    });

    if( !exchangeUser ) {

        const error = new Error(
            'The provided email verification code is invalid.'
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }
    else if( !exchangeUser.emailToVerify ) {

        const error = new Error(
            'The provided email has already been verified.'
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    if(
        !(
            (
                exchangeUser.emailToVerify ===
                email
            ) &&
            (
                flamingoCrescentDecrypt({
                    
                    text: exchangeUser.hashedPassword

                }) === getHashedPassword({ password })
            ) &&
            (
                exchangeUser.verifyEmailCode ===
                verifyEmailCode
            )
        )
    ) {

        const error = new Error(
            'The provided data for email verification is invalid.'
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    await verifyEmailMessageIdIsValid({

        email,
        emailMessageId: exchangeUser.emailMessageId,
    });

    const responseValues = {

        exchangeUserId,
    };

    console.log(
        
        'ensureVerificationRequestIsValid executed successfully - ' +
        `returning values: ${ stringify( responseValues ) }`
    );

    return responseValues;
});
