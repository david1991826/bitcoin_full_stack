'use strict';

const {
    utils: {
        business: { getBalance }
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze({
    getBalance,
    getIfApiIsActive: require( './getIfApiIsActive' ),
    getIfApiIsOnData: require( './getIfApiIsOnData' ),
});
