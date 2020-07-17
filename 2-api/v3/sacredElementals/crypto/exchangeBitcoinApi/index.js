'use strict';

const BitcoinApi = require( 'bitcoin-api' );

const {
    constants: {
        environment: {
            isProductionMode,
        }
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

const initializationValues = {};


if( isProductionMode ) {

    Object.assign(
        initializationValues,
        {
            livenetMode: true,
            livenetToken: process.env.EXCHANGE_BITCOIN_API_LIVENET_TOKEN,
        }
    );
}
else {

    Object.assign(
        initializationValues,
        {
            testnetToken: process.env.EXCHANGE_BITCOIN_API_TESTNET_TOKEN,
        }
    );
}


const bitcoinApi = new BitcoinApi( initializationValues );


module.exports = bitcoinApi;
