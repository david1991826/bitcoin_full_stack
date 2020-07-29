'use strict';

const {
    utils: {
        aws: {
            dinoCombos: {
                balances: {
                    updateBalance,
                }
            }
        },
        stringify,
    },
    constants: {
        withdraws: {
            states: {
                pending,
            }
        },
        users: {
            balanceTypes: { normalWithdraw }
        },
        normalWithdraws: {
            normalWithdrawsIds: {
                api
            }
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const getGetNewBalance = Object.freeze( ({

    totalAmountToDeduct

}) => ({

    existingBalanceData,

}) => (
    (
        (
            !!existingBalanceData[ normalWithdraw ][ api ] &&
            !!existingBalanceData[ normalWithdraw ][ api ].amount &&
            existingBalanceData[ normalWithdraw ][ api ].amount
        ) || 0
    ) + totalAmountToDeduct
));


module.exports = Object.freeze( async ({
    
    userId,
    totalAmountToDeduct,

}) => {
    
    console.log(
        'running updateWithdrawBalance with the following values: ' +
        stringify({
            userId,
            state: pending
        })
    );

    const getNewBalance = getGetNewBalance({

        totalAmountToDeduct,
    });

    await updateBalance({
        userId,
        getNewBalance,
        balanceType: normalWithdraw,
        balanceId: api,
        state: pending,
        shouldDoOperationWithLock: false
    });

    console.log( 'updateWithdrawBalance executed successfully' );
});