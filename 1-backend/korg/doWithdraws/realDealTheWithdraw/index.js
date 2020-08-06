
'use strict';

const {
    constants: {
        withdraws: {
            states: {
                // pending,
                verifying,
                // waiting,
                realDealing
            },
        },
        aws: { database: { tableNames: { WITHDRAWS } } },
    },
    utils: {
        database: {
            metadata: {
                getFeeData
            }
        },
        doOperationInQueue,
        // javascript: {
        //     getQueueId
        // },
        aws: {
            dino: {
                getDatabaseEntry,
                updateDatabaseEntry
            },
        },
        stringify
    }
} = require( '@bitcoin-api.io/common-private' );

const getTheActualFee = require( './getTheActualFee' );

const {
    
    getFeeEstimateAmount

} = require( '../../utils' );


module.exports = Object.freeze( async ({

    userId,
    ultraKey,
    getQueueId,
    idForGetQueueId,

}) => {
    
    console.log(
        'running realDealTheWithdraw for withdraw: ' +
        stringify({
            userId: userId,
            ultraKey: ultraKey
        })
    );

    await doOperationInQueue({
        queueId: getQueueId({ type: WITHDRAWS, id: idForGetQueueId }),
        doOperation: async () => {

            const blessedWithdraw = await getDatabaseEntry({
            
                tableName: WITHDRAWS,
                value: userId,
                sortValue: ultraKey
            });
        
            if(
                !blessedWithdraw ||
                (blessedWithdraw.state !== realDealing)
            ) {

                throw new Error(
                    'realDealTheWithdraw - ' + 
                    `invalid blessed withdraw ${
                        stringify( blessedWithdraw )
                    }`
                );
            }

            const feeEstimateAmount = getFeeEstimateAmount({
                blessedWithdraw
            });

            const actualFee = await getTheActualFee({

                transactionId: blessedWithdraw.transactionId,
            });

            const itsTimeForARealDeal = actualFee < feeEstimateAmount;

            console.log(`
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
Real Deal the Withdraw
--------------------------------------------------------------------------------
🌳 fee estimate amount => ${ feeEstimateAmount }     
🌳 actual fee          => ${ actualFee }
--------------------------------------------------------------------------------
Is it time for a real deal? ${ itsTimeForARealDeal ? 'yes' : 'no' }
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
            `);

            const valuesToMerge = {};
            
            if( itsTimeForARealDeal ) {

                const newFeeData = getFeeData({

                    fee: actualFee,
                    feeMultiplier: 1,
                    megaServerId: blessedWithdraw.feeData.bitcoinNodeUrl,
                    noKeyProperty: true,
                    // blessingFee: blessedWithdraw.feeData.blessingFee,
                    // trinityFee: blessedWithdraw.feeData.trinityFee,
                    // sacramentFee: blessedWithdraw.feeData.sacramentFee,
                    businessFeeData: blessedWithdraw.feeData.businessFeeData,
                });

                Object.assign(

                    valuesToMerge,
                    {
                        feeData: newFeeData,
                        metadataToAdd: {
    
                            realDealData: {
                                previousFeeData: blessedWithdraw.feeData,
                                newFeeData,
                                timeOfRealDealFeeDataChange: Date.now(),
                            },
                            timeOfVerifyStateSet: Date.now(),
                            about: 'successful withdraw with fee refund',
                        }
                    }
                );
            }
            else {

                Object.assign(

                    valuesToMerge,
                    {
                        metadataToAdd: {
                            realDealData: {
                                previousFeeData: blessedWithdraw.feeData,
                                actualFee,
                                timeOfRealDealFeeDataAnalysis: Date.now(),
                                noRealDeal: true,
                            },
                            timeOfVerifyStateSet: Date.now(),
                            about: 'successful withdraw',
                        }
                    }
                );
            }

            const newWithdrawDatabaseEntry = Object.assign(
                {},
                blessedWithdraw,
                {
                    state: verifying,
                },
                valuesToMerge
            );

            await updateDatabaseEntry({

                tableName: WITHDRAWS,
                entry: newWithdrawDatabaseEntry
            });
        },
    });

    console.log(
        'realDealTheWithdraw executed successfully for: ' +
        stringify({
            userId: userId,
            ultraKey: ultraKey
        })
    );
});
