'use strict';

const {
    utils: {
        stringify
    },
} = require( '@bitcoin-api.io/common-private' );

const {
    aws: {
        ses: {
            sendEmail
        }
    },
    constants: {
        urls: {
            exchangeUrl,
        }
    }
} = require( '../../../../../../exchangeUtils' );

const {
    validation: {
        getIfEmailIsValid
    }
} = require( '../../../../../../utils' );


const getEmailHtml = require( './getEmailHtml' );


module.exports = Object.freeze( async ({

    email,
    verifyEmailCode,
    isProbablyCrypto,
    
}) => {

    console.log(
        `running sendVerificationCodeEmail
            with the following values - ${
                stringify({
                    email,
                    verifyEmailCode,
                    isProbablyCrypto,
                })
        }`
    );

    const baseUrlToUse = isProbablyCrypto ? (

        'https://probablycrypto.com'

    ) : exchangeUrl;

    const verificationLink = (
     
        `${ baseUrlToUse }/` +
        'mode/account_verification/' +
        `verification_code/${ verifyEmailCode }/` +
        `email/${ email }`
    );
    
    console.log(
        
        '🦒here is the email verification link: ' +
        verificationLink
    );

    const html = getEmailHtml({

        verificationLink,
        appName: isProbablyCrypto ? 'ProbablyCrypto.com' : 'atExchange.io',
    });

    const text = (

        `Your ` +
        `Account Verification Link is ${ verificationLink }`
    );

    const fromEmailAddress = isProbablyCrypto ? (
        'support@probablycrypto.com'
    ) : process.env.EXCHANGE_SUPPORT_EMAIL;

    if( !getIfEmailIsValid({ email: fromEmailAddress }) ) {

        throw new Error(
            
            'set up error: missing environment variable ' +
            '"EXCHANGE_SUPPORT_EMAIL". This error was thrown in ' +
            `"${ __dirname }".`
        );
    }

    await sendEmail({

        subject: 'Account Verification Code',
        html,
        text,
        toEmailAddress: email,
        // fromEmailAddress: email,
        fromEmailAddress,
    });

    console.log(
        'sendVerificationCodeEmail executed successfully'
    );
});
