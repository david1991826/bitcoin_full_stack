'use strict';

const {
    formatting: { getAmountNumber }
} = require( 'orgasm' );


module.exports = Object.freeze(
    ({
        feeData: {
            amount,
            multiplier,
            blessingFee,
            trinityFee,
            sacramentFee
        },
        pleaseDoNotLogAnything = false,
        shouldReturnAdvancedResponse = false

    }) => {
        
        const baseFee = getAmountNumber( amount * multiplier );
        const holyFee = getAmountNumber(
            blessingFee +
            trinityFee +
            sacramentFee
        );
        const feeToPay = getAmountNumber( baseFee + holyFee );

        if( !pleaseDoNotLogAnything ) {
            console.log( `
                
                Getting Fee to Pay:
                    
                    A) Base Fee = amount x multiplier
                        => ${ baseFee } BTC = ${ amount } BTC x ${ multiplier }
            `);

            console.log( `

                    B) Holy Fee = blessingFee + trinityFee + sacramentFee
                        => ${ holyFee } BTC = ${ blessingFee } BTC + ${ trinityFee } BTC + ${ sacramentFee } BTC
            `);

            console.log(`
            
                    Fee to Pay = A) Base Fee + B) Holy Fee
                        => ${ feeToPay } BTC = ${ baseFee } BTC + ${ holyFee } BTC
            `);
        }

        if( shouldReturnAdvancedResponse ) {

            return {
                baseFee,
                holyFee,
                feeToPay
            };
        }

        return feeToPay;
    }
);
