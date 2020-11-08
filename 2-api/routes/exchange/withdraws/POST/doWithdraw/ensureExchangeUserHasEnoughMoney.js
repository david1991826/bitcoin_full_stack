'use strict';

const {
    utils: {
        stringify,
        database:{
            metadata: {
                metaGetFeeToPayFromFeeData
            },
        }
    }
} = require( '@bitcoin-api/full-stack-api' );

const {
    utils: {
        aws: {
            dinoCombos: {
                getExchangeUser
            }
        }
    }
} = require( '@bitcoin-api/full-stack-exchange' );

const {
    exchangeUsers: {
        getBalanceData
    }
} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    withdrawAmount,
    shouldIncludeFeeInAmount,
    feeData,
    exchangeUserId,

}) => {

    console.log( 'running ensureExchangeUserHasEnoughMoney' );

    const exchangeUser = await getExchangeUser({

        exchangeUserId,
    });

    const balanceData = getBalanceData({

        exchangeUser,
    });

    const metaFeeToPay = metaGetFeeToPayFromFeeData(
        {
            shouldIncludeFeeInAmount
        },
        {
            feeData,
        }
    );

    const totalRequestedWithdrawAmount = withdrawAmount + metaFeeToPay;
    const totalAmountExchangeUserHas = balanceData.summary.bitcoin.totalAmount;

    console.log(
        'ensureExchangeUserHasEnoughMoney - ' +
        'here are the values to be considered: ' +
        stringify({

            totalRequestedWithdrawAmount,
            totalAmountExchangeUserHas
        })
    );

    if( totalRequestedWithdrawAmount > totalAmountExchangeUserHas ) {

        const error = new Error(

            'user does not have enough money to perform ' +
            'the requested withdraw'
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    console.log(
        
        'ensureExchangeUserHasEnoughMoney executed successfully - ' +
        'exchange user has enough money to perform the withdraw'
    );

    return {
        metaFeeToPay
    };
});