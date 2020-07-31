'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api.io/common-private' );

const validateAndGetValues = require( './validateAndGetValues' );
const ensureVerificationRequestIsValid = require( './ensureVerificationRequestIsValid' );
const verifyUserEmail = require( './verifyUserEmail' );
const doLogin = require( '../../../../../sacredElementals/crypto/doLogin' );


module.exports = Object.freeze( async ({

    event,
    ipAddress
    
}) => {

    const rawEmail = event.body.email;
    const rawPassword = event.body.password;
    const rawVerifyEmailCode = event.body.verifyEmailCode;

    console.log(
        
        `running verifyUser with the following values - ${ stringify({

            rawEmail,
            rawPassword,
            rawVerifyEmailCode
        }) }`
    );

    const {

        email,
        password,
        verifyEmailCode

    } = validateAndGetValues({

        rawEmail,
        rawPassword,
        rawVerifyEmailCode,
    });

    const {
        
        exchangeUserId,

    } = await ensureVerificationRequestIsValid({

        email,
        password,
        verifyEmailCode
    });

    await verifyUserEmail({

        email,
        password,
        verifyEmailCode,
        ipAddress,
        exchangeUserId
    });

    console.log( '🦩verify user - performing login' );

    const doLoginResults = await doLogin({

        event,
        ipAddress
    });

    console.log( '🦩verify user - login performed successfully' );

    const verifyUserResponse = Object.assign(
        {},
        doLoginResults
    );

    console.log(
        
        'verifyUser executed successfully - ' +
        `returning values: ${ stringify( verifyUserResponse ) }`
    );

    return verifyUserResponse;
});
