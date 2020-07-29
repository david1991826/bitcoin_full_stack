'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    validation: {
        getIfEmailIsValid
    }
} = require( '../../../utils' );

const {
    validation: {
        getIfPasswordIsValid
    }
} = require( '../../../exchangeUtils' );


module.exports = Object.freeze( ({

    rawEmail,
    rawPassword,
    
}) => {

    console.log(
        `running validateAndGetValues
            with the following values - ${ stringify({
                email: rawEmail,
                password: rawPassword,
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

    const validValues = {

        email: rawEmail.toLowerCase(),
        password: rawPassword
    };

    console.log(
        
        'validateAndGetValues executed successfully - got values ' +
        stringify( validValues )
    );

    return validValues;
});
