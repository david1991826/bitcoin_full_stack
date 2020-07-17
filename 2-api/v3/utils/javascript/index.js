'use strict';

const {
    utils: {
        javascript: {
            getQueueId,
            getRandomIntInclusive,
        },
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze({

    getQueueId,
    getRandomIntInclusive,
    Crypto: require( './Crypto' ),
});