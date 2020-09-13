'use strict';

const BitcoinAPI = require( 'bitcoin-api' );

const {
    constants: {
        environment: {
            isProductionMode,
        }
    },
} = require( '@bitcoin-api/full-stack-api' );

const initializationValues = {};


Object.assign(
    initializationValues,
    {
        livenetMode: isProductionMode,
        token: process.env.EXCHANGE_BITCOIN_API_TOKEN,
        baseUrl: process.env.API_BASE_URL 
    }
);


const bitcoinAPI = new BitcoinAPI( initializationValues );


module.exports = bitcoinAPI;
