'use strict';

const  {
    validation: { getIsValidAddress },
    formatting: { getAmountNumber }
} = require( 'orgasm' );

const {
    utils: {
        stringify,
        business: {
            getIsValidWithdrawAmount
        }
    },
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

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
    rawShouldDoFullWithdraw,

}) => {
    
    console.log(
        
        `running validateAndGetValues with values: ${ stringify({
            rawAmount,
            rawShouldIncludeFeeInAmount,
            rawAddress,
            rawEnviroWithdrawAmount,
            rawShouldDoFullWithdraw,
        })}`
    );

    const withdrawAmount = getAmountNumber( rawAmount );

    if(
        !rawAddress ||
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

            `invalid includeFeeInAmount value: ${
                rawShouldIncludeFeeInAmount
            }`
        );
        validationError.bulltrue = true;
        throw validationError;
    }
    else if( typeof rawShouldDoFullWithdraw !== 'boolean' ) {

        const validationError = new ValidationError(

            `invalid fullWithdraw value: ${
                rawShouldDoFullWithdraw
            }`
        );
        validationError.bulltrue = true;
        throw validationError;
    }

    const enviroWithdrawAmount = validateAndGetEnviroWithdrawAmount({

        rawEnviroWithdrawAmount
    });

    const results = {

        addressToSendTo: rawAddress,
        shouldIncludeFeeInAmount: rawShouldIncludeFeeInAmount,
        enviroWithdrawAmount,
        shouldDoFullWithdraw: rawShouldDoFullWithdraw,
    };

    if( !rawShouldDoFullWithdraw ) {

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

        results.withdrawAmount = withdrawAmount;
    }

    console.log(
        
        'validateAndGetValues executed successfully, ' +
        'here are the values: ' +
        stringify( results )
    );

    return results;
});
