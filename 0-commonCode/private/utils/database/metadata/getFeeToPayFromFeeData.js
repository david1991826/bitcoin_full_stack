'use strict';

const {
    formatting: { getAmountNumber }
} = require( 'orgasm' );

const feeSumReducer = Object.freeze(
    
    ( accumulator, currentValue ) => accumulator + currentValue
);

const getBusinessFeeString = Object.freeze( ({

    businessFeeData,
    businessKeys,
    businessFee,

}) => {

    let businessFeeString = `${ businessFee } BTC = `;

    if( businessKeys.length === 0 ) {

        businessFeeString += `no business fee data specified`;
    }
    else {

        for( const businessKey of businessKeys ) {

            const businessValue = businessFeeData[ businessKey ];

            businessFeeString += `${ businessValue.amount } BTC (${ businessKey } fee) + `;
        }

        businessFeeString = businessFeeString.substring(

            0,
            businessFeeString.length - 3
        );
    }

    return businessFeeString;
});


module.exports = Object.freeze(
    ({
        feeData: {
            amount,
            multiplier,
            businessFeeData,
        },
        pleaseDoNotLogAnything = false,
        shouldReturnAdvancedResponse = false

    }) => {

        const baseFee = getAmountNumber( amount * multiplier );

        const businessKeys = Object.keys(
          
            businessFeeData
        );

        const businessFee = getAmountNumber(
            
            businessKeys.map( businessKey => {

                const businessValue = businessFeeData[ businessKey ];

                return businessValue.amount;
            }
            
        ).reduce( feeSumReducer, 0 ) );

        const feeToPay = getAmountNumber( baseFee + businessFee );

        if( !pleaseDoNotLogAnything ) {

            console.log( `
                
                Getting Fee to Pay:
                    
                    A) Base Fee (Blockchain Fee) = amount x multiplier
                        => ${ baseFee } BTC = ${ amount } BTC x ${ multiplier }
            `);

            const businessFeeString = getBusinessFeeString({

                businessFeeData,
                businessKeys,
                businessFee
            });

            console.log( `

                    B) Business Fee = sum of business fee data amounts
                        => ${ businessFeeString }
            `);

            console.log(`
            
                    Fee to Pay = A) Base Fee + B) Business Fee
                        => ${ feeToPay } BTC = ${ baseFee } BTC + ${ businessFeeString } BTC
            `);
        }

        if( shouldReturnAdvancedResponse ) {

            return {
                baseFee,
                businessFee,
                feeToPay
            };
        }

        return feeToPay;
    }
);
