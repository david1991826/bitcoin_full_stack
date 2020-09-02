'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api' );

const {
    validation: {
        getIfEmailIsValid
    }
} = require( '../../../../../utils' );

const {
    validation: {
        getIfPasswordIsValid
    }
} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( ({

    rawEmail,
    rawPassword,
    rawVerifyEmailCode,
    
}) => {

    console.log(
        `running validateAndGetValues
            with the following values - ${ stringify({
                email: rawEmail,
                password: rawPassword,
                verifyEmailCode: rawVerifyEmailCode
            })
        }`
    );

    const emailIsInvalid = !getIfEmailIsValid({
        
        email: rawEmail,
    });
    
    if( emailIsInvalid ) {

        const err = new Error( 'invalid email provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    const passwordIsInvalid = !getIfPasswordIsValid({

        password: rawPassword
    });
    
    if( passwordIsInvalid ) {

        const err = new Error( 'invalid password provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    const verifyEmailCodeIsInvalid = (

        !rawVerifyEmailCode ||
        (
            !rawVerifyEmailCode ||
            (typeof rawVerifyEmailCode !== 'string') ||
            (rawVerifyEmailCode.length < 5) ||
            (rawVerifyEmailCode.length > 169)
        )
    );

    if( verifyEmailCodeIsInvalid ) {

        const err = new Error( 'invalid email code provided' );
        err.bulltrue = true;
        err.statusCode = 400;
        throw err;
    }

    const validValues = {

        email: rawEmail.toLowerCase(),
        password: rawPassword,
        verifyEmailCode: rawVerifyEmailCode
    };

    console.log(
        
        'validateAndGetValues executed successfully - got values ' +
        stringify( validValues )
    );

    return validValues;
});
