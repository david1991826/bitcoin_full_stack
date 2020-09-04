'use strict';


module.exports = Object.freeze({

    withdraws: {
        states: {
            complete: 'complete',
            pending: 'pending',
            failed: 'failed',
            realDealing: 'realDealing',
            verifying: 'verifying',
            verifyingToFail: 'verifyingToFail',
            manualFail: 'manualFail',
            waiting: 'waiting'
        },

        limits: {
            minimumWithdrawAmount: 0.00004,
            maximumWithdrawAmount: 69,
        },
        
        nullAmount: 'nullAmount',
    },

    balances: {

        states: {

            normal: 'normal',
            transformation: 'transformation'
        }
    }
});