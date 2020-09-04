'use strict';

const {
    utils: {
        javascript: {
            getQueueId,
            getRandomIntInclusive,
        },
    },
} = require( '@bitcoin-api/full-stack-api' );


module.exports = Object.freeze({

    getQueueId,
    getRandomIntInclusive,
    Crypto: require( './Crypto' ),
});