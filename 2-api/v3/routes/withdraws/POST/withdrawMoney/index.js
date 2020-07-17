'use strict';

const {
    utils: {
        doOperationInQueue,
        javascript: { getQueueId },
        stringify,
    },
    constants: {
        aws: { database: { tableNames: { BALANCES, WITHDRAWS } } }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const getFeeData = require( './getFeeData' );
const doWithdrawMoney = require( './doWithdrawMoney' );


module.exports = Object.freeze( async ({ event, user }) => {
    
    console.log( 'running /withdraws - POST function' );

    const requestBody = (!!event && !!event.body && event.body) || {};

    const rawAmount = (
        requestBody.amount
    ) || null;
    const rawShouldIncludeFeeInAmount = (
        requestBody.includeFeeInAmount
    ) || false;
    const rawAddress = requestBody.address;
    const rawEnviroWithdrawAmount = requestBody.enviroWithdrawAmount;
        
    console.log( `
            🐒THE POWER OF NOW🍌🏯!
                A withdraw is being attempted,👷🏾‍♀️

            running withdrawMoney, here are the parameters:

                ${ stringify({

                    rawAmount,
                    rawShouldIncludeFeeInAmount,
                    rawAddress,
                    rawEnviroWithdrawAmount
                }) }
    ` );

    const feeData = await getFeeData();

    const withdrawMoneyResults = await doOperationInQueue({
        queueId: getQueueId({ type: WITHDRAWS, id: user.userId }),
        doOperation: () => doOperationInQueue({
            queueId: getQueueId({ type: BALANCES, id: user.userId }),
            doOperation: () => doWithdrawMoney({
                rawAmount,
                rawShouldIncludeFeeInAmount,
                rawAddress,
                rawEnviroWithdrawAmount,
                feeData,
                user,
            }),
        }),
    });
        
    return withdrawMoneyResults;
});
