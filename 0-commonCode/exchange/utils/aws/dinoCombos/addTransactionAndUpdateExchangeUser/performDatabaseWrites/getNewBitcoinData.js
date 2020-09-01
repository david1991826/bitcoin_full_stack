'use strict';

const {
    utils: {
        bitcoin: {
            formatting: { getAmountNumber }
        }    
    }
} = require( '@bitcoin-api/full-stack-api' );

const {
    transactions: {
        types,
    }
} = require( '../../../../../constants' );


module.exports = Object.freeze( ({

    exchangeUser,
    theOracleOfDelphiDefi,

}) => {

    const bitcoinData = (
            
        exchangeUser &&
        exchangeUser.moneyData &&
        exchangeUser.moneyData.bitcoin

    ) || [];

    const newBitcoinData = bitcoinData.slice();

    const { 

        [types.addBitcoin]: {
            addressToData,
        },

    } = theOracleOfDelphiDefi;

    for( const address of Object.keys( addressToData ) ) {

        const data = theOracleOfDelphiDefi[
            types.addBitcoin
        ].addressToData[ address ];

        for( const newBitcoinDatum of newBitcoinData ) {

            if( newBitcoinDatum.address === address ) {

                Object.assign(
                    newBitcoinDatum,
                    {
                        lastUpdated: Date.now(),
                        amount: getAmountNumber( data.amount ),
                    }
                );
            }
        }
    }

    return newBitcoinData;
});
