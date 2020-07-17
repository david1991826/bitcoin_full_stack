'use strict';

const {

    backgroundExecutor

} = require( 'common-utilities' );


module.exports = Object.freeze({

    backgroundExecutor,
    getFeeEstimateAmount: require( './getFeeEstimateAmount' ),
});