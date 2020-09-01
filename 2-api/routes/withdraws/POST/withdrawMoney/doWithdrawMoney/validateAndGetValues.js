'use strict';

const {
    utils: {
        stringify,
        business: {
            getIsValidWithdrawAmount
        },
        bitcoin: {
            validation: { getIsValidAddress },
            formatting: { getAmountNumber }
        }
    },
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@bitcoin-api.io/common-private' );

const {
    errors: { ValidationError },
} = require( '../../../../../utils' );

const validateAndGetEnviroWithdrawAmount = Object.freeze( ({

    rawEnviroWithdrawAmount

}) => {

    if( !rawEnviroWithdrawAmount ) {

        return 0;
    }

    if( typeof rawEnviroWithdrawAmount !== 'number' ) {
        
        const validationError = new ValidationError(
            `invalid enviroWithdrawAmount: ${ rawEnviroWithdrawAmount }`
        );

        validationError.bulltrue = true;

        throw validationError;
    }
    
    if(
        (rawEnviroWithdrawAmount < 0) ||
        (rawEnviroWithdrawAmount > 69)
    ) {

        const validationError = new ValidationError(
            `invalid enviroWithdrawAmount: ${ rawEnviroWithdrawAmount }`
        );

        validationError.bulltrue = true;

        throw validationError;
    }

    return rawEnviroWithdrawAmount;
});


module.exports = Object.freeze( ({

    rawAmount,
    rawShouldIncludeFeeInAmount,
    rawAddress,
    rawEnviroWithdrawAmount,

}) => {
    
    console.log(
        
        `running validateAndGetValues with values: ${ stringify({
            rawAmount,
            rawShouldIncludeFeeInAmount,
            rawAddress,
            rawEnviroWithdrawAmount,
        })}`
    );

    const withdrawAmount = getAmountNumber( rawAmount );
    
    const theWithdrawAmountIsInvalid = !getIsValidWithdrawAmount({

        withdrawAmount 
    });

    if( theWithdrawAmountIsInvalid ) {

        const validationError = new ValidationError(
            `invalid withdraw amount: ${ withdrawAmount }`
        );

        validationError.bulltrue = true;

        throw validationError;
    }
    else if(
        (
            (typeof rawAddress !== 'string') ||
            (rawAddress.length > 100)
        ) ||
        (
            isProductionMode &&
            !getIsValidAddress( rawAddress )
        )
    ) {

        const validationError = new ValidationError(

            `invalid withdraw address: ${ rawAddress }`
        );

        validationError.bulltrue = true;

        throw validationError;
    }
    else if( typeof rawShouldIncludeFeeInAmount !== 'boolean' ) {

        const validationError = new ValidationError(

            `invalid shouldIncludeFeeInAmount: ${
                rawShouldIncludeFeeInAmount
            }`
        );

        validationError.bulltrue = true;

        throw validationError;
    }

    const enviroWithdrawAmount = validateAndGetEnviroWithdrawAmount({

        rawEnviroWithdrawAmount
    });

    return {

        withdrawAmount,
        addressToSendTo: rawAddress,
        shouldIncludeFeeInAmount: rawShouldIncludeFeeInAmount,
        enviroWithdrawAmount,
    };
});
