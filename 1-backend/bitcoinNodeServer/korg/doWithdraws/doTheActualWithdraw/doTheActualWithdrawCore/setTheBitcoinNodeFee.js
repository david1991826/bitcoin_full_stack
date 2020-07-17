'use strict';

const {
    utils: {
        stringify
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    
    getFeeEstimateAmount

} = require( '../../../utils' );

const {
    formatting: {
        getAmountNumber
    },
} = require( 'orgasm' );

const {
    doBitcoinRequest,
} = require( 'common-utilities' );


const errorTypes = Object.freeze({

    theFeeIsTooLow: 'theFeeIsTooLow',
    unexpectedIssueInSettingFee: 'unexpectedIssueInSettingFee',
});


const getErrorType_LogSuccessAndReturnResponse = Object.freeze( ({

    errorType

}) => {
    
    console.log(
        (
            'withdrawBitcoinFromNode -  ' +
            'getErrorType executed successfully, returning error type:'
        ),
        errorType
    );

    return errorType;
});


const getErrorType = Object.freeze( ({ err }) => {

    console.log(
        'running setTheBitcoinNodeFee - getErrorType on error:', err.message
    );

    const exitCode = Math.abs(
        Number(
            !!err &&
            err.exitCode
        )
    );
    
    if( exitCode === 8 ) {

        return getErrorType_LogSuccessAndReturnResponse({

            errorType: errorTypes.theFeeIsTooLow,
        });
    }

    return getErrorType_LogSuccessAndReturnResponse({

        errorType: errorTypes.unexpectedIssueInSettingFee,
    });
});

const setFeeAttemptIncrementAmount = 0.000001;


const safeSetFee = Object.freeze( async ({

    feeToChargeTheBitcoinNode,
    attemptNumber = 1,

}) => {

    console.log(

        `running safeSetFee: ${ stringify({

            feeToChargeTheBitcoinNode,
            attemptNumber
        }) }`
    );

    const amountToChargeBitcoinNode = getAmountNumber(
        
        feeToChargeTheBitcoinNode
    );

    const setFeeArgs = [
        'settxfee',
        amountToChargeBitcoinNode        
    ];

    try {
        
        await doBitcoinRequest({ args: setFeeArgs });

        console.log(

            `safeSetFee executed successfully: ${ stringify({
    
                amountToChargeBitcoinNode
            }) }`
        );
        
        return amountToChargeBitcoinNode;
    }
    catch( err ) {

        const errorType = getErrorType({ err });

        if( errorType === errorTypes.theFeeIsTooLow ) {

            const increasedFeeToChargeTheBitcoinNode = (

                amountToChargeBitcoinNode + setFeeAttemptIncrementAmount
            );

            console.log(

                `safeSetFee fee is too low, incrementing fee: ${ stringify({
        
                    increasedFeeToChargeTheBitcoinNode
                }) }`
            );

            return await safeSetFee({

                feeToChargeTheBitcoinNode: increasedFeeToChargeTheBitcoinNode,
                attemptNumber: attemptNumber + 1
            });
        }

        console.log(

            `unexpected error in safeSetFee: ${ err }`
        );

        throw err;
    }
});


module.exports = Object.freeze( async ({

    blessedWithdraw,

}) => {

    console.log(`

        Running setTheBitcoinNodeFee with the following values: ${
            
            stringify({

                feeFee: blessedWithdraw.feeData
            })
        }
    `);

    const feeToChargeTheBitcoinNode = getFeeEstimateAmount({

        blessedWithdraw
    });

    const chosenFeeToChargeTheBitcoinNode = await safeSetFee({

        feeToChargeTheBitcoinNode,
    });

    console.log(`

        setTheBitcoinNodeFee executed successfully:
            the fee was set at: ${
            stringify({

                chosenFeeToChargeTheBitcoinNode,
            })
        }
    `);

    return chosenFeeToChargeTheBitcoinNode;
});
