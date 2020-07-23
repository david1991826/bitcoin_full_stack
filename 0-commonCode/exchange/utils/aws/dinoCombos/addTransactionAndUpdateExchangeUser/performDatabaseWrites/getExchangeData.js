'use strict';

const {
    transactions: {
        types,
    }
} = require( '../../../../../constants' );

const getCryptoAmountNumber = require(
    
    '../../../../crypto/getCryptoAmountNumber'
);

const {
    formatting: {
        getAmountNumber
    }
} = require( 'orgasm' );


module.exports = Object.freeze( ({

    theOracleOfDelphiDefi,

}) => {

    const { 

        [types.exchange]: {
            totalBitcoinAmount,
            totalCryptoAmount,
        },

    } = theOracleOfDelphiDefi;

    const exchangeData = {
        crypto: {
            amount: getCryptoAmountNumber( totalCryptoAmount ),
        },
        bitcoin: {
            amount: getAmountNumber( totalBitcoinAmount ),
        },
        lastUpdated: Date.now(),
    };

    return exchangeData;
});
