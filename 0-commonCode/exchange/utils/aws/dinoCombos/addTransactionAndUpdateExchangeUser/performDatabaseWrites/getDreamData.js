'use strict';

const {
    transactions: {
        types,
    }
} = require( '../../../../../constants' );

const getCryptoAmountNumber = require(
    
    '../../../../crypto/getCryptoAmountNumber'
);


module.exports = Object.freeze( ({

    theOracleOfDelphiDefi,

}) => {

    const { 

        [types.dream]: {
            totalCryptoAmount,
        },

    } = theOracleOfDelphiDefi;

    const dreamData = {
        crypto: {
            amount: getCryptoAmountNumber( totalCryptoAmount ),
        },
        lastUpdated: Date.now(),
    };

    return dreamData;
});
