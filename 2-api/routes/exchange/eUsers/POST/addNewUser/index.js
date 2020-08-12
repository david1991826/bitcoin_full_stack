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
        
        emailMessageId,

    } = await sendVerificationCodeEmail({
        email,
        // verifyEmailCode,
        isProbablyCrypto: event.isProbablyCrypto,
    });

    const {
        
        userObject,
        // verifyEmailCode,

    } = await addNewUserToDatabase({

        email,
        password,
        ipAddress,
        emailMessageId,
        // isHumanScore
    });

    const addNewUserResponse = Object.assign(
        {},
        userObject
    );

    console.log(
        
        'addNewUser executed successfully - ' +
        `returning values: ${ stringify( addNewUserResponse ) }`
    );

    return addNewUserResponse;
});
