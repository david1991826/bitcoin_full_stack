'use strict';

const {
    utils: {
        aws: {
            dino: {
                getExchangeDatabaseEntry
            } 
        }
    }
} = require( '@bitcoin-api.io/common-exchange' );


module.exports = Object.freeze({

    getExchangeDatabaseEntry,
});
