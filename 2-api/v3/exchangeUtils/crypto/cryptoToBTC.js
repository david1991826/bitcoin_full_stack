'use strict';

const {
    exchanges: {
        rates: {
            cryptoOverBTC
        }
    }
} = require( '../constants' );

const { formatting: { getAmountNumber } } = require( 'orgasm' );


module.exports = Object.freeze( ({

    amountInCrypto
    
}) => {

    const amountInBTC = getAmountNumber( amountInCrypto / cryptoOverBTC );

    return amountInBTC;
});
