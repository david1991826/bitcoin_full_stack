'use strict';

const {
    utils: {
        aws: {
            dinoCombos: {
                balances: {
                    getIfUserHasEnoughMoneyToMakeTheWithdraw
                }
            }
        },
        stringify,
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    throwNotEnoughBitcoinOnTokenError
} = require( '../../common' );


module.exports = Object.freeze( async ({

    withdrawAmount,
    feeData,
    userId,
    shouldIncludeFeeInAmount

}) => {

    console.log(
        `☢️🐑running ensureUserHasEnoughMoney with the following values: ${
            stringify({
                withdrawAmount,
                userId,
                feeData,
                shouldIncludeFeeInAmount
            })
        }`
    );

    const userDoesNotHaveEnoughMoneyToMakeTheWithdraw = !(
        
        await getIfUserHasEnoughMoneyToMakeTheWithdraw({

            withdrawAmount,
            feeData,
            userId,
            shouldIncludeFeeInAmount,
        })
    );

    if( userDoesNotHaveEnoughMoneyToMakeTheWithdraw ) {

        console.log(
            'ensureUserHasEnoughMoney error - ' +
            'This user does not have enough money to make the withdraw.🦀'
        );

        throw throwNotEnoughBitcoinOnTokenError();
    }

    console.log(
        'ensureUserHasEnoughMoney executed successfully - ' +
        'The user has enough money to do this withdraw.🐲🐉'
    );
});
