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
} = require( 'general-common' );


module.exports = Object.freeze( ({
    
    withdrawAmount,

}) => !(

    Number.isNaN( withdrawAmount ) ||
    (withdrawAmount > maximumWithdrawAmount) ||
    (withdrawAmount < minimumWithdrawAmount)
));