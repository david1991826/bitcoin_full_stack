'use strict';

const {
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const BitcoinApi = require( 'bitcoin-api' );

const bitcoinApi = new BitcoinApi({

    livenetMode: isProductionMode,
    testnetToken: process.env.BITCOIN_API_TOKEN_FOR_MONITORING_TESTS,
    livenetToken: process.env.BITCOIN_API_TOKEN_FOR_MONITORING_TESTS
});

const errorMessages = Object.freeze({

    apiNotActive: 'apiNotActive',
    invalidApiResponse: 'invalidApiResponse',
});


module.exports = Object.freeze({

    errorMessages,
    bitcoinApi,
});
