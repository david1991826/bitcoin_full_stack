
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
} = require( '@bitcoin-api.io/common-private' );

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
