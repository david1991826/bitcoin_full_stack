'use strict';

const {
    utils: {
        stringify
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze(({

    rawAgreeToTerms,
    rawAgreeToPrivacyPolicy,
    rawIsHumanValue,
    rawTestSecret

}) => {
    
    console.log(
        'running validateAndGetValues with the following values:',
        stringify({
            
            rawAgreeToTerms,
            rawAgreeToPrivacyPolicy,
            rawIsHumanValue,
            rawTestSecret: !!rawTestSecret,
        })
    );

    const values = {};

    if( !!rawAgreeToTerms ) {

        if( rawAgreeToTerms !== true ) {

            const err = new Error(
                
                `invalid agreeToTerms value: ${ rawAgreeToTerms }`
            );
            err.bulltrue = true;
            err.statusCode = 400;
            throw err;
        }

        values.agreeToTerms = true;
    }
    
    if( !!rawAgreeToPrivacyPolicy ) {

        if( rawAgreeToPrivacyPolicy !== true ) {

            const err = new Error(
                
                `invalid agreeToPrivacyPolicy value: ` +
                `${ rawAgreeToPrivacyPolicy }` 
            );
            err.bulltrue = true;
            err.statusCode = 400;
            throw err;
        }

        values.agreeToPrivacyPolicy = true;
    }
    
    if( !!rawIsHumanValue ) {

        if(
            (typeof rawIsHumanValue !== 'string') ||
            (rawIsHumanValue.length > 9000)
        ) {

            const err = new Error(
                
                `invalid isHumanValue value: ${ rawIsHumanValue }`
            );
            err.bulltrue = true;
            err.statusCode = 400;
            throw err;
        }

        values.isHumanValue = rawIsHumanValue;
    }
    else if( !!rawTestSecret ) {

        if(
            rawTestSecret ===
            process.env.PATCH_TOKENS_BYPASS_IS_HUMAN_TEST_SECRET
        ) {

            values.bypassIsHumanTest = true;
        }
    }

    if( Object.keys( values ).length < 1 ) {

        const err = new Error( 'no values provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    console.log(
        'validateAndGetValues executed successfully, got values:',
        JSON.stringify( Object.keys( values ) )
    );

    return values;
});