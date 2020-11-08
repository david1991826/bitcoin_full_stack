'use strict';

const {
    utils: {
        bitcoin: {
            formatting: { getAmountNumber }
        }    
    },
} = require( '@bitcoin-api/full-stack-api' );

const {
    transactions: {
        types,
    }
} = require( '../../../../../constants' );


module.exports = Object.freeze( ({

    theOracleOfDelphiDefi,

}) => {

    const { 

        [types.withdrawBitcoin]: {
            totalAmount
        },

    } = theOracleOfDelphiDefi;

    const bitcoinWithdrawsData = {
        currentState: 'power_omega',
        lastUpdated: Date.now(),
        totalAmount: getAmountNumber( totalAmount )
    };

    return bitcoinWithdrawsData;
});
