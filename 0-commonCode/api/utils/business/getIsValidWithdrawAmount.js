'use strict';

const {
    withdraws: {
        limits: {
            minimumWithdrawAmount,
            maximumWithdrawAmount
        }
    }
} = require( '../../constants' );


module.exports = Object.freeze( ({
    
    withdrawAmount,

}) => !(

    Number.isNaN( withdrawAmount ) ||
    (withdrawAmount > maximumWithdrawAmount) ||
    (withdrawAmount < minimumWithdrawAmount)
));