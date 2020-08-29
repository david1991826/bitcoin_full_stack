'use strict';

const BitcoinApi = require( 'bitcoin-api' );

const {
    constants: {
        environment: {
            isProductionMode,
        }
    },
} = require( '@bitcoin-api.io/common-private' );

const initializationValues = {};


Object.assign(
    initializationValues,
    {
        livenetMode: isProductionMode,
        token: process.env.EXCHANGE_BITCOIN_API_TOKEN,
        baseUrl: process.env.API_BASE_URL 
    }
);


const bitcoinApi = new BitcoinApi( initializationValues );


module.exports = bitcoinApi;
