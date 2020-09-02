'use strict';

const uuidv4 = require( 'uuid/v4' );

const {
    utils: {
        database: { metadata: { metaGetFeeToPayFromFeeData } },
        stringify,
    }
} = require( '@bitcoin-api/full-stack-api' );

const { throwNotEnoughBitcoinOnTokenError } = require( '../../common' );
const validateAndGetValues = require( './validateAndGetValues' );
const ensureUserIsAllowedToMakeTheWithdraw = require( './ensureUserIsAllowedToMakeTheWithdraw' );
const updateWithdrawBalance = require( './updateWithdrawBalance' );
const putWithdrawEntry = require( './putWithdrawEntry' );
const getMagnaFeeData = require( './getMagnaFeeData' );


module.exports = Object.freeze( async ({

    rawAmount,
    rawShouldIncludeFeeInAmount,
    rawAddress,
    rawEnviroWithdrawAmount,
    feeData,
    user,

}) => {

    const { userId } = user;

    console.log(
        '🐑☢️running doWithdrawMoney -',
        stringify({

            ['Raw amount in BTC']: rawAmount,
            ['Raw "should include fee in amount?"']: rawShouldIncludeFeeInAmount,
            ['raw bitcoin address to send to']: rawAddress,
            ['unprocessed fee data (not magna enhanced yet)']: feeData,
            ['raw EnviroWithdraw amount']: rawEnviroWithdrawAmount,
            ['the user']: user,
        })
    );
    
    if( !user.hasGottenAddress ) {

        console.log(
            '/withdraws - POST function - user has not ' +
            'even gotten an address yet and they are ' +
            'trying to withdraw money... ☢️🐑GET THE DRAGONS!!! ' +
            '... 🐲🐉🐉🐉🐉🐉🐉🐉🐉🐉🐉🐉🐉🐉🐉🔥🔥🔥🔥🔥🔥' +
            '🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥'
        );
    
        return throwNotEnoughBitcoinOnTokenError();
    }

    const {

        withdrawAmount,
        addressToSendTo,
        shouldIncludeFeeInAmount,
        enviroWithdrawAmount

    } = validateAndGetValues({

        rawAmount,
        rawShouldIncludeFeeInAmount,
        rawAddress,
        rawEnviroWithdrawAmount
    });

    feeData = getMagnaFeeData({
        
        feeData,
        enviroWithdrawAmount
    });

    await ensureUserIsAllowedToMakeTheWithdraw({
        withdrawAmount,
        feeData,
        userId,
        shouldIncludeFeeInAmount
    });

    // const feeToPay = shouldIncludeFeeInAmount ? 0 : getFeeToPayFromFeeData({

    //     feeData,
    // });

    const feeToPay = metaGetFeeToPayFromFeeData(
        {
            shouldIncludeFeeInAmount
        },
        {
            feeData,
        }
    );
    
    const [
        {
            creationDate,
            withdrawId,
            ultraKey
        }
    ] = await Promise.all([

        putWithdrawEntry({

            userId,
            addressToSendTo,
            amount: withdrawAmount,
            feeData,
            shouldIncludeFeeInAmount
        }),

        updateWithdrawBalance({

            userId,
            totalAmountToDeduct: withdrawAmount + feeToPay
        }),
    ]);

    const powerId = uuidv4();

    console.log(
        'temporary log of values - (they might not be needed to be defined) ' +
        stringify({

            powerId,
            creationDate,
            withdrawId,
            ultraKey
        })
    );

    console.log( '🐑☢️doWithdrawMoney executed successfully' );

    return {

        /* powerId */
    };
});
