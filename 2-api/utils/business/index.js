'use strict';

const {
    utils: {
        business: { getBalance }
    },
} = require( '@bitcoin-api/full-stack-api' );


module.exports = Object.freeze({
    getBalance,
    getIfApiIsActive: require( './getIfApiIsActive' ),
    getIfApiIsOnData: require( './getIfApiIsOnData' ),
});
