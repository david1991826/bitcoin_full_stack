'use strict';

const {
    utils: {
        bitcoin: {
            validation: { getIsValidAddress }
        },
    },
} = require( '@bitcoin-api/full-stack-api' );

module.exports = getIsValidAddress;