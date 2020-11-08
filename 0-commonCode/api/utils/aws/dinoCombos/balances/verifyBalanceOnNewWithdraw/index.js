'use strict';

const doOperationInQueue = require( '../../../../doOperationInQueue' );
const nativeGetQueueId = require( '../../../../javascript/getQueueId' );
const getVanguardQueueId = require( '../../../../javascript/getVanguardQueueId' );
const stringify = require( '../../../../stringify' );
const getDatabaseEntry = require( '../../../dino/getDatabaseEntry' );
const {
    aws: {
        database: {
            tableNames: {
                WITHDRAWS, BALANCES
            }
        }
    },
    withdraws: {
        states: {
            verifying,
            verifyingToFail,
            complete,
            failed
        }
    }
} = require( '../../../../../constants' );

const refreshBalance = require( './refreshBalance' );
const updateWithdraw = require( './updateWithdraw' );


const getVanguardValues = Object.freeze( ({

    isExchangeWithdraw,
    userId,
    idForGetQueueId

}) => {

    if( isExchangeWithdraw ) {

        return {

            getQueueId: getVanguardQueueId,
            chosenIdForGetQueueId: idForGetQueueId,
        };
    }

    return {

        getQueueId: nativeGetQueueId,
        chosenIdForGetQueueId: userId,
    };
});


module.exports = Object.freeze( async ({

    userId,
    ultraKey,

    isExchangeWithdraw = false,
    idForGetQueueId,
    addTransactionAndUpdateExchangeUserDeluxe,

}) => {

    if(
        isExchangeWithdraw &&
        !(
            !!addTransactionAndUpdateExchangeUserDeluxe &&
            !!idForGetQueueId
        )
    ) {

        throw new Error(
            'verifyBalanceOnNewWithdraw: missing isExchangeWithdraw values'
        );
    }

    const {

        getQueueId,
        chosenIdForGetQueueId,

    } = getVanguardValues({

        isExchangeWithdraw,
        userId,
        idForGetQueueId
    });

    console.log(
        'running verifyBalanceOnNewWithdraw for withdraw: ' +
        stringify({
            isExchangeWithdraw,
            chosenIdForGetQueueId,
            userId,
            ultraKey
        })
    );

    await doOperationInQueue({
        queueId: getQueueId({ type: WITHDRAWS, id: chosenIdForGetQueueId }),
        doOperation: async () => {

            const coreFunction = async () => {

                const blessedWithdraw = await getDatabaseEntry({
            
                    tableName: WITHDRAWS,
                    value: userId,
                    sortValue: ultraKey
                });
            
                if( !blessedWithdraw ) {

                    throw new Error(
                        'doTheActualWithdrawCore - ' + 
                        `invalid blessed withdraw ${
                            stringify( blessedWithdraw )
                        }`
                    );
                }

                if( blessedWithdraw.state === verifying ) {

                    await updateWithdraw({
                        withdraw: blessedWithdraw,
                        state: complete,
                        extraMetadata: {

                            timeOfSuccessfulCompletion: Date.now(),
                        },
                    });
                }
                else if( blessedWithdraw.state === verifyingToFail ) {

                    await updateWithdraw({
                        withdraw: blessedWithdraw,
                        state: failed,
                        extraMetadata: {

                            timeOfFailure: Date.now(),
                        },
                    });
                }
                else {

                    throw new Error(
                        'doTheActualWithdrawCore - ' + 
                        'invalid blessed withdraw state: ' +
                        blessedWithdraw.state
                    );
                }

                if( isExchangeWithdraw ) {
                    // TODO: Remove this part, maybe move balance out
                    // TODO: probably not be necessary to pass in values
                    return await addTransactionAndUpdateExchangeUserDeluxe({

                        blessedWithdrawState: blessedWithdraw.state,
                    });
                }
                else {

                    return await refreshBalance({
                        userId: userId,
                        normalWithdrawId: blessedWithdraw.normalWithdrawId,
                    });
                }
            };

            if( isExchangeWithdraw ) {

                return await coreFunction();
            }

            return doOperationInQueue({
                queueId: getQueueId({ type: BALANCES, id: userId }),
                doOperation: async () => {
                    return await coreFunction();
                },
            });
        }
    });

    console.log( 'verifyBalanceOnNewWithdraw executed successfully🦕🦖' );
});
