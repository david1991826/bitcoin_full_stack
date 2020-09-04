'use strict';

const {
    formatting: { getAmountNumber }
} = require( '../../bitcoin' );

const feeSumReducer = Object.freeze(
    
    ( accumulator, currentValue ) => accumulator + currentValue
);

const getBusinessFeeStringComponents = Object.freeze( ({

    businessFeeData,
    businessKeys,
    businessFee,

}) => {

    const businessFeeStringPart1 = `${ businessFee } BTC = `;
    let businessFeeStringPart2 = '';

    if( businessKeys.length === 0 ) {

        businessFeeStringPart2 += `no business fee data specified`;
    }
    else {

        for( const businessKey of businessKeys ) {

            const businessValue = businessFeeData[ businessKey ];

            businessFeeStringPart2 += `${ businessValue.amount } BTC (${ businessKey } fee) + `;
        }

        businessFeeStringPart2 = businessFeeStringPart2.substring(

            0,
            businessFeeStringPart2.length - 3
        );
    }

    return {
        
        businessFeeStringPart1,
        businessFeeStringPart2,
    };
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
                
            } ).reduce( feeSumReducer, 0 )
        );

        const feeToPay = getAmountNumber( baseFee + businessFee );

        if( !pleaseDoNotLogAnything ) {

            console.log( `
                
                Getting Fee to Pay:
                    
                    A) Base Fee (Blockchain Fee) = amount x multiplier
                        => ${ baseFee } BTC = ${ amount } BTC x ${ multiplier }
            `);

            const {
        
                businessFeeStringPart1,
                businessFeeStringPart2,

            } = getBusinessFeeStringComponents({

                businessFeeData,
                businessKeys,
                businessFee
            });

            const fullBusinessFeeString = (
                businessFeeStringPart1 + businessFeeStringPart2
            );

            console.log( `

                    B) Business Fee = sum of business fee data amounts
                        => ${ fullBusinessFeeString }
            `);

            console.log(`
            
                    Fee to Pay = A) Base Fee + B) Business Fee
                        => ${ feeToPay } BTC = ${ baseFee } (blockchain fee) BTC + ${ businessFeeStringPart2 } BTC
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