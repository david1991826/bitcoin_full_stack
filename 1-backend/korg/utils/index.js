'use strict';

const {

    backgroundExecutor

} = require( '@bitcoin-api.io/backend-common-utilities' );


module.exports = Object.freeze({

    backgroundExecutor,
    getFeeEstimateAmount: require( './getFeeEstimateAmount' ),
});