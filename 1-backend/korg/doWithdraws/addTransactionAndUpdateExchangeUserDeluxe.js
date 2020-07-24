'use strict';

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser
            }
        },
    },
    constants: {
        // aws: {
        //     database: {
        //         tableNames: {
        //             EXCHANGE_USERS
        //         }
        //     }
        // },
        transactions: {
            types,
            bitcoinWithdrawTypes
        }
    }
} = require( '@bitcoin-api.io/common-exchange' );

const {
    utils: {
        stringify,
        // doOperationInQueue,
        // javascript: {
        //     getQueueId
        // },
        aws: {
            dino: {
                getDatabaseEntry,
            }
        },
        database:{
            metadata: {
                metaGetFeeToPayFromFeeData
            } 
        }
    },
    constants: {
        aws: {
            database: {
                tableNames: {
                    WITHDRAWS
                }
            }
        },
        withdraws: {
            states
        }
    }
} = require( '@bitcoin-api.io/common-private' );


const addTransactionAndUpdateExchangeUserDeluxeCore = Object.freeze( async ({

    userId,
    ultraKey,

}) => {

    const {

        exchangeUserId,
        addressToSendTo,
        amount,
        shouldIncludeFeeInAmount,
        feeData,
        withdrawId,
        state

    } = await getDatabaseEntry({
            
        tableName: WITHDRAWS,
        value: userId,
        sortValue: ultraKey
    });

    const metaFeeToPay = metaGetFeeToPayFromFeeData(
        {
            shouldIncludeFeeInAmount
        },
        {
            feeData,
        }
    );

    const bitcoinWithdrawType = (
        state === states.complete
    ) ? bitcoinWithdrawTypes.success : bitcoinWithdrawTypes.failed;

    await addTransactionAndUpdateExchangeUser({

        exchangeUserId,
        type: types.withdrawBitcoin,
        data: {
            address: addressToSendTo,
            amount,
            fee: metaFeeToPay,
            withdrawId,
            bitcoinWithdrawType,
        },
    });
});


module.exports = Object.freeze( async ({

    exchangeUserId,
    userId,
    ultraKey

}) => {
    
    console.log(
        'running addTransactionAndUpdateExchangeUserDeluxe with ' +
        `the following values: ${ stringify({
            exchangeUserId,
            userId,
            ultraKey,
        })}`
    );

    // await doOperationInQueue({
    //     queueId: getQueueId({ type: EXCHANGE_USERS, id: exchangeUserId }),
    //     doOperation: async () => {

            await addTransactionAndUpdateExchangeUserDeluxeCore({

                userId,
                ultraKey,
            });
    //     }
    // });

    console.log(
        'addTransactionAndUpdateExchangeUserDeluxe ' +
        'executed successfully'
    );
});
