'use strict';

const {
    utils: {
        stringify
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

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

    await sendEmail({

        subject: 'Account Verification Code',
        html,
        text,
        toEmailAddress: email,
        // fromEmailAddress: email,
        fromEmailAddress: isProbablyCrypto ? (
            'support@probablycrypto.com'
        ) : 'support@atexchange.io',
    });

    console.log(
        'sendVerificationCodeEmail executed successfully'
    );
});
