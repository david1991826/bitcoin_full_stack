'use strict';

const updateBalance = require( '../../updateBalance' );
const {
    withdraws: {
        states: {
            complete,
            pending
        }
    },
    users: {
        balanceTypes: {
            normalWithdraw
        }
    },
} = require( '../../../../../../constants' );

const getWithdrawData = require( './getWithdrawData' );


module.exports = Object.freeze( async ({

    userId,
    // totalAmountForCurrentWithdraw,
    normalWithdrawId,
    // withdrawId

}) => {

    console.log( 'running refreshBalance' );
    
    const {
        
        totalWithdrawAmount,
        balanceIsInTransformationState,

    } = await getWithdrawData({
        
        userId,
    });

    await updateBalance({

        userId,
        newBalance: totalWithdrawAmount,
        balanceType: normalWithdraw,
        balanceId: normalWithdrawId,
        state: balanceIsInTransformationState ? pending : complete,
        shouldDoOperationWithLock: false
    });

    console.log( 'refreshBalance executed successfully' );
});