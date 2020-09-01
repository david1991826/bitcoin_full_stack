'use strict';

const {
    exchanges: {
        rates: {
            cryptoOverBTC
        }
    }
} = require( '../constants' );

const getCryptoAmountNumber = require( './getCryptoAmountNumber' );


module.exports = Object.freeze( ({

    amountInBtc
    
}) => {

    const amountInCrypto = getCryptoAmountNumber(
        amountInBtc * cryptoOverBTC
    );

    return amountInCrypto;
});
