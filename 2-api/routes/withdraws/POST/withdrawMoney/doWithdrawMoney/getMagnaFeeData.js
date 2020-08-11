'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api.io/common-private' );

// used by ePOST/withdraws
module.exports = Object.freeze( ({

    feeData,
    enviroWithdrawAmount,
    // exchangeFeeToAdd
    // sacramentFeeToAdd = 0

}) => {

    console.log(
        
        'getMagnaFeeData - ' +
        `getting the magna fee: ${ stringify({

            feeData,
            enviroWithdrawAmount,
            // sacramentFeeToAdd
        })}`
    );

    const magnaFeeData = Object.assign(

        {},
        feeData
        // {
        //     blessingFee: feeData.blessingFee + enviroWithdrawAmount,
        //     sacramentFee: feeData.sacramentFee + sacramentFeeToAdd,
        // }
    );

    magnaFeeData.businessFeeData.enviroWithdraw = {
        
        amount: enviroWithdrawAmount,
    };

    console.log(
        
        'getMagnaFeeData - ' +
        `got magna fee data: ${ stringify({

            magnaFeeData
        })}`
    );
    
    return magnaFeeData;
});
