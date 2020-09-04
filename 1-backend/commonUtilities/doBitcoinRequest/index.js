'use strict';

const {
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@bitcoin-api/full-stack-api' );

if( isProductionMode ) {

    process.env.BITCOIN_REQUEST_MODE = 'livenet';
}

const bitcoinRequest = require( 'bitcoin-request' );


module.exports = Object.freeze(({

    args

}) => {

    return bitcoinRequest({

        command: args,
    });
});