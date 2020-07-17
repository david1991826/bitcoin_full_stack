
'use strict';

const {
    constants: {
        environment: {
            isProductionMode
        }
    },
    utils: {
        database: { metadata: { getFeeToPayFromFeeData } },
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const stagingTransactionFee = 0.00001000;


module.exports = Object.freeze( ({

    blessedWithdraw,

}) => {

    const feeEstimateAmount = (

        isProductionMode ? getFeeToPayFromFeeData({
            feeData: blessedWithdraw.feeData,
            shouldReturnAdvancedResponse: true

        }).baseFee : stagingTransactionFee
    );

    return feeEstimateAmount;
});
