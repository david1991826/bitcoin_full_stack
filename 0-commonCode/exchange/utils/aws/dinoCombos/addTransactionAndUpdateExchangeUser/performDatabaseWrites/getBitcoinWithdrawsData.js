'use strict';

const { formatting: { getAmountNumber } } = require( 'orgasm' );

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
