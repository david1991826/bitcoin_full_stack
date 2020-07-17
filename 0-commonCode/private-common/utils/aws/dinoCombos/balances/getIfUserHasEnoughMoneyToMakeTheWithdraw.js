'use strict';

const getDatabaseEntry = require( '../../dino/getDatabaseEntry' );
const stringify = require( '../../../stringify' );
const getBalance = require( '../../../business/getBalance' );
const metaGetFeeToPayFromFeeData = require( '../../../database/metadata/metaGetFeeToPayFromFeeData' );
const {
    aws: {
        database: { tableNames: { BALANCES } },
    },
} = require( '../../../../constants' );

const getBalanceInformation = Object.freeze( async ({ userId }) => {

    const balanceData = await getDatabaseEntry({
        tableName: BALANCES,
        value: userId,
    });

    const {

        // moneyOutIsInTransformationState,
        balance

    } = getBalance({ balanceData });

    return {
        balance,
    };
});


// NOTE: should be used within withdraw + balance lock
module.exports = Object.freeze( async ({

    withdrawAmount,
    feeData,
    userId,
    shouldIncludeFeeInAmount = false

}) => {

    console.log(
        '☢️🐑running getIfUserHasEnoughMoneyToMakeTheWithdraw ' +
        `with the following values: ${
            stringify({
                withdrawAmount, userId, feeData, shouldIncludeFeeInAmount
            })
        }`
    );

    // const feeToPay = shouldIncludeFeeInAmount ? 0 : getFeeToPayFromFeeData({

    //     feeData
    // });

    const feeToPay = metaGetFeeToPayFromFeeData(
        {
            shouldIncludeFeeInAmount
        },
        {
            feeData,
        }
    );

    const totalRequestedWithdrawAmount = withdrawAmount + feeToPay;

    const {
        
        balance,

    } = await getBalanceInformation({ userId });

    console.log(
        `getIfUserHasEnoughMoneyToMakeTheWithdraw: ${ stringify({

            ['Amount requested to withdraw (with fees)']: (
                totalRequestedWithdrawAmount
            ),
            ['Current user balance']: balance
        })}`
    );

    if( totalRequestedWithdrawAmount > balance ) {

        console.log(

            'getIfUserHasEnoughMoneyToMakeTheWithdraw - ' +
            'The amount requested to be withdrawn is ' +
            `${ totalRequestedWithdrawAmount }BTC. This amount is greater ' +
            'than the balance on the token associated with the request: ` +
            `${ balance }BTC.`
        );

        return false;
    }

    console.log(
        'getIfUserHasEnoughMoneyToMakeTheWithdraw executed successfully - ' +
        'The user has enough money to do this withdraw.🐲🐉'
    );

    return true;
});
