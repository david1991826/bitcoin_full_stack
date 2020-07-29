'use strict';

const {
    utils: {
        stringify,
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    constants: {
        exchanges: {
            bounds
        }
    },
} = require( '@npm.m.stecky.efantis/common-exchange' );

const {
    crypto: {
        getCryptoAmountNumber
    }
} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( ({

    rawAmount,

}) => {
    
    console.log(
        
        `running validateAndGetValues with values: ${ stringify({
            rawAmount,
        }) }`
    );

    if(
        !rawAmount ||
        (typeof rawAmount !== 'number') ||
        (rawAmount < bounds.crypto.min) ||
        (rawAmount > bounds.crypto.max)
    ) {

        const validationError = new Error(

            `invalid amount: ${ rawAmount }`
        );
        validationError.bulltrue = true;
        validationError.statusCode = 400;
        throw validationError;
    }

    const results = {

        amount: getCryptoAmountNumber( rawAmount )
    };

    console.log(
        
        'validateAndGetValues executed successfully, ' +
        'here are the values: ' +
        stringify( results )
    );

    return results;
});
