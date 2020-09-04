'use strict';

const {
    formatting: {
        getAmountNumber
    }
} = require( 'orgasm' );

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
