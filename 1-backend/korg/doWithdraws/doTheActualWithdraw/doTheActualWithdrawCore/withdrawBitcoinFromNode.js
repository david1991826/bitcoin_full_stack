'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api.io/common-private' );
const {
    formatting: {
        getAmountNumber
    },
} = require( 'orgasm' );

const { doBitcoinRequest } = require( 'common-utilities' );


const errorTypes = Object.freeze({
    
    invalidAddressError: 'invalidAddressError',
    invalidMoneyInNode: 'invalidMoneyInNode',
    unexpectedIssueInWithdraw: 'unexpectedIssueInWithdraw',
});


const getErrorType_LogSuccessAndReturnResponse = Object.freeze( ({

    errorType

}) => {
    
    console.log(
        (
            'withdrawBitcoinFromNode -  ' +
            'getErrorType executed successfully, ' +
            'returning ' +
            'error type:'
        ),
        errorType
    );

    return errorType;
});


const getErrorType = Object.freeze( ({ err }) => {

    console.log(
        'running withdrawBitcoinFromNode - getErrorType on error:', err
    );

    const exitCode = Math.abs(
        Number(
            !!err &&
            err.exitCode
        )
    );
    
    if( exitCode === 5 ) {

        return getErrorType_LogSuccessAndReturnResponse({

            errorType: errorTypes.invalidAddressError,
        });
    }
    else if( [ 4, 6 ].includes( exitCode ) ) {

        return getErrorType_LogSuccessAndReturnResponse({

            errorType: errorTypes.invalidMoneyInNode,
        });
    }

    return getErrorType_LogSuccessAndReturnResponse({

        errorType: errorTypes.unexpectedIssueInWithdraw,
    });
});


module.exports = Object.freeze( async ({

    addressToSendTo,
    amount,
    shouldIncludeFeeInAmount

}) => {

    console.log(`
        performing withdrawBitcoinFromNode
            with the following values: ${
                stringify({

                    addressToSendTo,
                    amount,
                    shouldIncludeFeeInAmount
                })
            }
    `);

    const amountNumber = getAmountNumber( amount );
    const comment = '';
    const commentTo = '';

    const withdrawMoneyArgs = [
        'sendtoaddress',
        addressToSendTo,
        amountNumber,
        comment,
        commentTo
    ];

    if( shouldIncludeFeeInAmount ) {

        const subtractFeeFromAmount = true;

        withdrawMoneyArgs.push( subtractFeeFromAmount );
    }

    const {

        invalidAddressErrorOccurred = false,
        notEnoughMoneyErrorOccurred = false,
        transactionId = null,

    } = await doBitcoinRequest({ args: withdrawMoneyArgs }).then(

        transactionId => {

            console.log( 
                
                'withdrawBitcoinFromNode executed successfully, ' + 
                `the transactionId is "${ transactionId }".`
            );

            return {

                transactionId,
            };

        }, err => {

            const errorType = getErrorType({ err });

            console.log(
                'withdrawBitcoinFromNode',
                'error in withdrawing bitcoins:',
                err,
                stringify({ errorType })
            );

            if( errorType === errorTypes.invalidAddressError ) {

                console.log(
                    'withdrawBitcoinFromNode executed successfully ' +
                    '- invalid withdraw address'
                );

                return {

                    invalidAddressErrorOccurred: true,
                };
            }
            else if( errorType === errorTypes.invalidMoneyInNode ) {

                console.log(
                    
                    'withdrawBitcoinFromNode executed successfully - ' +
                    'broke case - The bitcoin node does not have ' +
                    'enough money.'
                );

                return {

                    notEnoughMoneyErrorOccurred: true,
                };
            }

            console.log( 'error in withdrawBitcoinFromNode:', err );

            throw err;
        }
    );

    return {

        invalidAddressErrorOccurred,
        notEnoughMoneyErrorOccurred,
        transactionId,
    };
});
