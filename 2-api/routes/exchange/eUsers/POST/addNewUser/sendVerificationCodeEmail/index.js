'use strict';

const {
    utils: {
        stringify
    },
} = require( '@bitcoin-api/full-stack-api' );

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
    },
    javascript: {
        getExchangeUserIdData,
        verificationCodeTools: {
            getVerificationCode
        }
    },
    
} = require( '../../../../../../exchangeUtils' );

const {
    validation: {
        getIfEmailIsValid
    }
} = require( '../../../../../../utils' );

const getEmailHtml = require( './getEmailHtml' );


module.exports = Object.freeze( async ({

    email,
    isProbablyCrypto,
    
}) => {

    console.log(
        `running sendVerificationCodeEmail
            with the following values - ${
                stringify({
                    email,
                    isProbablyCrypto,
                })
        }`
    );

    const baseUrlToUse = isProbablyCrypto ? (

        'https://probablycrypto.com'

    ) : exchangeUrl;

    const {
        
        exchangeUserId,
        baseId

    } = getExchangeUserIdData();

    const verifyEmailCode = getVerificationCode({

        baseId,
    });

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
        appName: isProbablyCrypto ? 'ProbablyCrypto.com' : (

            process.env.EXCHANGE_APP_NAME || 'Bitcoin-Api Exchange'
        ),
    });

    const text = (

        'Your ' +
        `account verification link is "${ verificationLink }".`
    );

    const fromEmailAddress = isProbablyCrypto ? (
        'support@probablycrypto.com'
    ) : process.env.EXCHANGE_MANAGEMENT_EMAIL;

    if( !getIfEmailIsValid({ email: fromEmailAddress }) ) {

        throw new Error(
            
            'set up error: missing environment variable ' +
            '"EXCHANGE_MANAGEMENT_EMAIL". This error was thrown in ' +
            `"${ __dirname }".`
        );
    }

    const {
        
        emailMessageId,

    } = await sendEmail({

        subject: 'Account Verification Link',
        html,
        text,
        toEmailAddress: email,
        // fromEmailAddress: email,
        fromEmailAddress,
    });

    const sendVerificationCodeEmailResults = {

        exchangeUserId,
        emailMessageId,
        verifyEmailCode,
    };

    console.log(
        'sendVerificationCodeEmail executed successfully - ' +
        `returning results: ${    
            stringify( sendVerificationCodeEmailResults )
        }`
    );

    return sendVerificationCodeEmailResults;
});
