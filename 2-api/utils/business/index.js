'use strict';

const {
    utils: {
        business: { getBalance }
    },
} = require( '@bitcoin-api.io/common-private' );


module.exports = Object.freeze({
    getBalance,
    getIfApiIsActive: require( './getIfApiIsActive' ),
    getIfApiIsOnData: require( './getIfApiIsOnData' ),
});
