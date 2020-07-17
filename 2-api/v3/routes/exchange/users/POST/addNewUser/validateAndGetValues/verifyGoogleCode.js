'use strict';

const {
    doApiCall,
    constants: {
        google: {
            captcha: {
                verifyUrl
            }
        }
    }
} = require( '../../../../../../utils' );


module.exports = Object.freeze( async ({

    rawGoogleCode,
    ipAddress
    
}) => {

    console.log( 'running verifyGoogleCode' );

    const googleCodeIsInvalid = !(

        !!rawGoogleCode &&
        (typeof rawGoogleCode === 'string') &&
        (rawGoogleCode.length > 2) &&
        (rawGoogleCode.length < 5000)
    );

    if( googleCodeIsInvalid ) {

        const err = new Error( 'invalid googleCode provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    try {

        const {

            success,
            score

        } = JSON.parse(
            
            await doApiCall({

                url: verifyUrl,
                method: 'POST',
                body: {
                    secret: process.env.EXCHANGE_SIGN_UP_GOOGLE_CAPTCHA_SECRET,
                    response: rawGoogleCode,
                    remoteip: ipAddress,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded.'
                },
                json: false
            })
        );

        if( !success ) {

            const err = new Error( 'invalid googleCode provided' );
            err.bulltrue = true;
            err.statusCode = 400;
            throw err;
        }
    
        console.log( 'verifyGoogleCode executed successfully' );

        return {
            
            isHumanScore: score
        };
    }
    catch( err ) {
        
        console.log( 'error in verifyGoogleCode:', err );

        const error = new Error( 'invalid googleCode provided' );
        error.bulltrue = true;
        error.statusCode = 400;
        throw error;
    }
});
