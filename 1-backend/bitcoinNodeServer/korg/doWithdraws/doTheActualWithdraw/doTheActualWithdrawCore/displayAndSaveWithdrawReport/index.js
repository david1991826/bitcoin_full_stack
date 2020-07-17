'use strict';

const {
    utils: {
        stringify
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const safeWriteReportToFile = require( './safeWriteReportToFile' );


module.exports = Object.freeze( ({

    userId,
    ultraKey,
    feeData,
    balanceBeforeWithdraw,
    balanceAfterWithdraw,
    amount,
    feeToChargeTheBitcoinNode,
    transactionId,
    shouldIncludeFeeInAmount

}) => {

    const balanceDifference = balanceBeforeWithdraw - balanceAfterWithdraw;
    const theActualFee = balanceDifference - amount;

    const withdrawReport = {
        ['Balance before withdraw']: balanceBeforeWithdraw,
        ['Balance after withdraw']: balanceAfterWithdraw,
        ['Balance difference']: balanceDifference,
        ['Amount withdrew']: amount,
        ['Desired fee (base fee)']: feeToChargeTheBitcoinNode,
        ['Actual fee']: theActualFee,
        ['Desired fee - acutal fee']: feeToChargeTheBitcoinNode - theActualFee,
        ['The metadata']: {
            userId,
            ultraKey,
            feeData,
            transactionId
        },
        ['Should Include Fee in Amount']: shouldIncludeFeeInAmount,
    };

    console.log(`
    
        🦕Here is the Grand Withdraw Report🦖

            ${stringify( withdrawReport )}
    `);

    safeWriteReportToFile({

        withdrawReport
    });
});