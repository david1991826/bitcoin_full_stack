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


if( isProductionMode ) {

    Object.assign(
        initializationValues,
        {
            livenetMode: true,
            livenetToken: process.env.EXCHANGE_BITCOIN_API_TOKEN,
            livenetBaseUrl: process.env.API_BASE_URL 
        }
    );
}
else {

    Object.assign(
        initializationValues,
        {
            testnetToken: process.env.EXCHANGE_BITCOIN_API_TOKEN,
            testnetBaseUrl: process.env.API_BASE_URL, 
        }
    );
}


const bitcoinApi = new BitcoinApi( initializationValues );


module.exports = bitcoinApi;
