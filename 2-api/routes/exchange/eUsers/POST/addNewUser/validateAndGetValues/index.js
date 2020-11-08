'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api' );

const {
    validation: {
        getIfEmailIsValid
    },
} = require( '../../../../../../utils' );

const {
    validation: {
        getIfPasswordIsValid
    }
} = require( '../../../../../../exchangeUtils' );

// const verifyGoogleCode = require( './verifyGoogleCode' ); 


module.exports = Object.freeze( async ({

    rawEmail,
    rawPassword,
    // rawGoogleCode,
    ipAddress
    
}) => {

    console.log(
        `running validateAndGetValues
            with the following values - ${ stringify({
                email: rawEmail,
                password: rawPassword,
                // googleCode: rawGoogleCode,
                ipAddress
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

    // const {
        
    //     isHumanScore,

    // } = await verifyGoogleCode({

    //     rawGoogleCode,
    //     ipAddress
    // });

    const validValues = {
        email: rawEmail.toLowerCase(),
        password: rawPassword,
        // isHumanScore,
    };

    console.log(
        
        'validateAndGetValues executed successfully - got values ' +
        stringify( validValues )
    );

    return validValues;
});
