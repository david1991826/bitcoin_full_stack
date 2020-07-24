'use strict';

const {
    constants: {
        withdraws: {
            states: {
                // pending,
                // verifying,
                verifyingToFail,
                // waiting,
                realDealing
            },
        },
        aws: { database: { tableNames: { WITHDRAWS } } },
        // environment: {
        //     isProductionMode
        // }
    },
    utils: {
        // database: { metadata: { getFeeToPayFromFeeData } },
        // business: {
        //     // getIsValidWithdrawAmount
        // },
        aws: {
            dino: {
                // getDatabaseEntry,
                updateDatabaseEntry
            },
        },
        stringify
    }
} = require( '@bitcoin-api.io/common-private' );

const {
    doBitcoinRequest,
    constants
} = require( 'common-utilities' );

const {
    
    getFeeEstimateAmount

} = require( '../../../utils' );

const getBalance = Object.freeze( () => doBitcoinRequest({ args: [ 'getbalance' ] }));
const setUpWithdraw = require( './setUpWithdraw' );
const setTheBitcoinNodeFee = require( './setTheBitcoinNodeFee' );
const withdrawBitcoinFromNode = require( './withdrawBitcoinFromNode' );
const displayAndSaveWithdrawReport = require( './displayAndSaveWithdrawReport' );

// const stagingTransactionFee = 0.00001000;


module.exports = Object.freeze( async ({

    existingWithdrawDatum,

}) => {

    console.log(`
        performing doTheActualWithdrawCore
            with the following values: ${
                stringify( {

                    existingWithdrawDatum

                } )
            }
    `);

    const {

        userId,
        ultraKey,
    
    } = existingWithdrawDatum;

    const {

        blessedWithdraw

    } = await setUpWithdraw({

        userId, ultraKey 
    });

    const {

        amount,
        feeData,
        addressToSendTo,
        shouldIncludeFeeInAmount,

    } = blessedWithdraw;

    const feeToChargeTheBitcoinNode = getFeeEstimateAmount({

        blessedWithdraw
    });

    console.log( 'Request to doTheActualWithdrawCore - setting the fee' );

    const chosenFeeToChargeTheBitcoinNode = await setTheBitcoinNodeFee({

        blessedWithdraw,
    });

    console.log(`

        Request to doTheActualWithdrawCore - withdrawing the money: ${
            JSON.stringify( {
                
                amount,
                shouldIncludeFeeInAmount,
            
            }, null, 4 )
        }
    `);

    const balanceBeforeWithdraw = await getBalance();

    const {
        
        notEnoughMoneyErrorOccurred,
        transactionId,
        invalidAddressErrorOccurred,

    } = await withdrawBitcoinFromNode({

        addressToSendTo,
        amount,
        shouldIncludeFeeInAmount,
    });

    if( notEnoughMoneyErrorOccurred ) {

        console.log(
            'The Api had insufficient funds ' +
            '(or similar error) for performing the withdraw. ' +
            'The withdraw will be marked as verify-to-fail.'
        );

        await updateDatabaseEntry({

            tableName: WITHDRAWS,
            entry: Object.assign(
                {},
                blessedWithdraw,
                {
                    state: verifyingToFail,
                    metadataToAdd: {
    
                        timeOfFailedWithdraw: Date.now(),
                        about: (
                            'withdraw attempt with invalid money error in ' +
                            'bitcoin node'
                        ),
                    }
                }
            )
        });

        console.log(`
            Request to doTheActualWithdrawCore - executed successfully🦍🙊
                case: no withdraw - not enough bitcoin
        `);

        return {
            withdrawOccurredSuccessfully: false,
        };
    }
    else if( invalidAddressErrorOccurred ) {

        console.log( 'marking the withdraw as verify-to-fail' );

        await updateDatabaseEntry({

            tableName: WITHDRAWS,
            entry: Object.assign(
                {},
                blessedWithdraw,
                {
                    state: verifyingToFail,
                    metadataToAdd: {
    
                        timeOfFailedWithdraw: Date.now(),
                        about: (
                            'withdraw attempt with invalid ' +
                            'address to send bitcoins to: ' +
                            `"${ addressToSendTo }"`
                        ),
                    }
                }
            )
        });

        console.log(`
            Request to doTheActualWithdrawCore - executed successfully🦍🙉
                case: no withdraw - invalid address
        `);

        return {
            withdrawOccurredSuccessfully: false,
        };
    }

    const balanceAfterWithdraw = await getBalance();

    displayAndSaveWithdrawReport({

        userId,
        ultraKey,
        feeData,
        balanceBeforeWithdraw,
        balanceAfterWithdraw,
        amount,
        feeToChargeTheBitcoinNode,
        transactionId,
        shouldIncludeFeeInAmount,
    });

    await updateDatabaseEntry({

        tableName: WITHDRAWS,
        entry: Object.assign(
            {},
            blessedWithdraw,
            {
                transactionId,
                state: realDealing,
                metadata: Object.assign(

                    {},
                    blessedWithdraw.metadata,
                    {
                        timeStatusWasSetToRealDeal: Date.now(),
                        locationOfWithdraw: constants.megaServerId,
                        chosenFeeToChargeTheBitcoinNode,
                    }
                ),
            }
        )
    });

    console.log(`
        Request to doTheActualWithdrawCore - executed successfully🏯🦖
            case: successful withdraw
    `);

    return {
        withdrawOccurredSuccessfully: true,
    };
});
