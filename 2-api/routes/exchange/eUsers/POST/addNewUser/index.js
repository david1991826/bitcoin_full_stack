'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api.io/common-private' );

const validateAndGetValues = require( './validateAndGetValues' );
const ensureUserDoesNotExist = require( './ensureUserDoesNotExist' );
const ensureEmailIsNotBlocked = require( './ensureEmailIsNotBlocked' );
const addNewUserToDatabase = require( './addNewUserToDatabase' );
const sendVerificationCodeEmail = require( './sendVerificationCodeEmail' );


module.exports = Object.freeze( async ({

    event,
    ipAddress
    
}) => {

    const rawEmail = event.body.email;
    const rawPassword = event.body.password;
    // const rawGoogleCode = event.body.googleCode;

    console.log(
        
        `running addNewUser with the following values - ${ stringify({

            email: rawEmail,
            password: rawPassword,
            // googleCode: rawGoogleCode,
        }) }`
    );

    const {

        email,
        password,
        // isHumanScore,

    } = await validateAndGetValues({

        rawEmail,
        rawPassword,
        // rawGoogleCode,
        ipAddress,
    });

    await ensureEmailIsNotBlocked({

        email,
    });

    await ensureUserDoesNotExist({

        email
    });

    const {
        
        exchangeUserId,
        emailMessageId,
        verifyEmailCode,

    } = await sendVerificationCodeEmail({
        email,
        // verifyEmailCode,
        isProbablyCrypto: event.isProbablyCrypto,
    });

    await addNewUserToDatabase({

        email,
        password,
        ipAddress,
        exchangeUserId,
        emailMessageId,
        verifyEmailCode,
        // isHumanScore
    });

    const addNewUserResponse = {};
    // Object.assign(
    //     {},
    //     {}
    // );

    console.log(
        
        'addNewUser executed successfully - ' +
        `returning values: ${ stringify( addNewUserResponse ) }`
    );

    return addNewUserResponse;
});
