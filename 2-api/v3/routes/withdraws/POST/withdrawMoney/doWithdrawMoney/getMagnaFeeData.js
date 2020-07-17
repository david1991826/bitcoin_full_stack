'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

// used by ePOST/withdraws
module.exports = Object.freeze( ({

    feeData,
    enviroWithdrawAmount,
    sacramentFeeToAdd = 0

}) => {

    console.log(
        
        'getMagnaFeeData - ' +
        `getting the magna fee: ${ stringify({

            feeData,
            enviroWithdrawAmount,
            sacramentFeeToAdd
        })}`
    );

    const magnaFeeData = Object.assign(

        {},
        feeData,
        {
            blessingFee: feeData.blessingFee + enviroWithdrawAmount,
            sacramentFee: feeData.sacramentFee + sacramentFeeToAdd,
        }
    );

    console.log(
        
        'getMagnaFeeData - ' +
        `got magna fee data: ${ stringify({

            magnaFeeData
        })}`
    );
    
    return magnaFeeData;
});
