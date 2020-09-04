'use strict';

const {
    constants: {
        withdraws: {
            limits: {
                minimumWithdrawAmount,
                maximumWithdrawAmount
            }
        }
    },
} = require( '@bitcoin-api.io/common-general' );


module.exports = Object.freeze( ({
    
    withdrawAmount,

}) => !(

    Number.isNaN( withdrawAmount ) ||
    (withdrawAmount > maximumWithdrawAmount) ||
    (withdrawAmount < minimumWithdrawAmount)
));