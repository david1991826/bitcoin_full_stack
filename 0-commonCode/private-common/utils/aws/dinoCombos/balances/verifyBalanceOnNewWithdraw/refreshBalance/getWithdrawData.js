'use strict';

const metaGetFeeToPayFromFeeData = require( '../../../../../database/metadata/metaGetFeeToPayFromFeeData' );
const stringify = require( '../../../../../stringify' );
const searchDatabase = require( '../../../../dino/searchDatabase' );
const {
    aws: {
        database: { tableNames: { WITHDRAWS } }
    },
    withdraws: {
        states: {
            complete,
            failed,
            manualFail,
            // verifying,
            verifyingToFail,
            // realDealing,
            // waiting,
            // pending
        }
    },
} = require( '../../../../../../constants' );

const beginningOfTime = 1;
const endOfTime = 696969696969696969696;
// it never ends🐉

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
        userId: '#userId',
        ultraKey: '#ultraKey',
        amount: '#amount',
        state: '#state',
        feeData: '#feeData',
        withdrawId: '#withdrawId',
        shouldIncludeFeeInAmount: '#shouldIncludeFeeInAmount',
    }),

    nameValues: f({
        userId: 'userId',
        ultraKey: 'ultraKey',
        amount: 'amount',
        state: 'state',
        feeData: 'feeData',
        withdrawId: 'withdrawId',
        shouldIncludeFeeInAmount: 'shouldIncludeFeeInAmount',
    }),

    valueKeys: f({
        state: ':state',
        userId: ':userId',
        startTime: ':startTime',
        endTime: ':endTime',
        failed: ':failed',
        manualFail: ':manualFail',
        // withdrawId: ':withdrawId',
    }),

    valueValues: f({
        state: complete,
        startTime: beginningOfTime,
        endTime: endOfTime,
        failed,
        manualFail,
    }),
});


module.exports = Object.freeze( async ({

    userId,
    // amountOffset,
    // normalWithdrawId
    // withdrawId

}) => {

    console.log(
        `running getWithdrawData - ${ stringify({
            userId,
            // amountOffset,
            // normalWithdrawId
        }) }`
    );

    const withdrawData = {

        totalWithdrawAmount: 0, // + amountOffset,
        balanceIsInTransformationState: false,
    };
    
    // let totalWithdrawAmount = 0 + amountOffset;
    let paginationValue = {
        ultraKey: 2
    };

    const dragonValues = Object.seal({
        iterationCount: 0,
        ['🐲']: '🐉',
    });

    const dynamicAttributes = f({

        valueValues: f({
            userId,
            // withdrawId
        }),
    });

    while( !!paginationValue ) {

        dragonValues.iterationCount++;

        console.log(
            'getting all withdraws: ' +
            `search iteration count ${ dragonValues.iterationCount }`
        );
    
        const searchParams = {
            TableName: WITHDRAWS,
            ProjectionExpression: [
                attributes.nameKeys.ultraKey,
                attributes.nameKeys.feeData,
                attributes.nameKeys.amount,
                attributes.nameKeys.state,
                attributes.nameKeys.withdrawId,
                attributes.nameKeys.shouldIncludeFeeInAmount,
            ].join( ', ' ),
            Limit: 2220,
            ScanIndexForward: true,
            KeyConditionExpression: (
                `${ attributes.nameKeys.userId } = ` +
                `${ attributes.valueKeys.userId } and ` +
                `${ attributes.nameKeys.ultraKey } between ` +
                `${ attributes.valueKeys.startTime } and ` +
                attributes.valueKeys.endTime
            ),
            FilterExpression: (
                `${ attributes.nameKeys.state } <> ${ attributes.valueKeys.failed } and ` +
                `${ attributes.nameKeys.state } <> ${ attributes.valueKeys.manualFail }`
                // `${ attributes.nameKeys.state } <> ${ attributes.valueKeys.manualFail } and ` +
                // `${ attributes.nameKeys.withdrawId } <> ${ attributes.valueKeys.withdrawId }`
            ),
            ExpressionAttributeNames: {
                [attributes.nameKeys.userId]: attributes.nameValues.userId,
                [attributes.nameKeys.ultraKey]: attributes.nameValues.ultraKey,
                [attributes.nameKeys.feeData]: attributes.nameValues.feeData,
                [attributes.nameKeys.amount]: attributes.nameValues.amount,
                [attributes.nameKeys.state]: attributes.nameValues.state,
                [attributes.nameKeys.withdrawId]: attributes.nameValues.withdrawId,
                [attributes.nameKeys.shouldIncludeFeeInAmount]: attributes.nameValues.shouldIncludeFeeInAmount,
            },
            ExpressionAttributeValues: {
                [attributes.valueKeys.userId]: dynamicAttributes.valueValues.userId,
                [attributes.valueKeys.startTime]: attributes.valueValues.startTime,
                [attributes.valueKeys.endTime]: attributes.valueValues.endTime,
                [attributes.valueKeys.failed]: attributes.valueValues.failed,
                [attributes.valueKeys.manualFail]: attributes.valueValues.manualFail,
                // [attributes.valueKeys.withdrawId]: dynamicAttributes.valueValues.withdrawId,
            },
            ExclusiveStartKey: {
                userId,
                ultraKey: paginationValue.ultraKey,
            }
        };

        const searchResults = await searchDatabase({
            searchParams,
        });

        const withdraws = searchResults.ultimateResults;

        for( const withdraw of withdraws ) {

            const withdrawShouldBeConsideredToHaveValidValue = ![

                // INCLUDES
                // complete: 'complete',
                // pending: 'pending',
                // realDealing: 'realDealing',
                // verifying: 'verifying',
                // waiting: 'waiting'

                // DOES NOT INCLUDE
                verifyingToFail,
                // failed, manualFail, // NOTE: already filtered

            ].includes( withdraw.state );

            if( withdrawShouldBeConsideredToHaveValidValue ) {

                const { amount, feeData, shouldIncludeFeeInAmount } = withdraw;

                // const fee = shouldIncludeFeeInAmount ? 0 : (
                    
                //     getFeeToPayFromFeeData({
                //         feeData,
                //         pleaseDoNotLogAnything: true,
                //     })
                // );

                const feeToPay = metaGetFeeToPayFromFeeData(
                    {
                        shouldIncludeFeeInAmount,
                        pleaseDoNotLogAnything: true
                    },
                    {
                        feeData,
                        pleaseDoNotLogAnything: true,
                    }
                );
    
                const totalAmountForWithdraw = amount + feeToPay;
    
                withdrawData.totalWithdrawAmount += totalAmountForWithdraw;    
            }

            if(
                !withdrawData.balanceIsInTransformationState &&
                ![

                    // INCLUDES
                    // pending: 'pending',
                    // realDealing: 'realDealing',
                    // verifying: 'verifying',
                    // waiting: 'waiting'
                    // verifyingToFail: 'verifyingToFail',

                    // DOES NOT INCLUDE
                    complete,
                    // failed, manualFail, // NOTE: already filtered

                ].includes( withdraw.state )
            ) {

                withdrawData.balanceIsInTransformationState = true;
            }
        }

        if( !!searchResults.paginationValue ) {

            paginationValue = searchResults.paginationValue;
        }
        else {

            paginationValue = null;
        }
    }

    console.log(
        'getWithdrawData executed successfully, here is the ' +
        `withdrawData: ${ stringify( withdrawData ) }`
    );

    return withdrawData;
});
