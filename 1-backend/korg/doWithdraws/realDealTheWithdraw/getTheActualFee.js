'use strict';

const bluebird = require( 'bluebird' );
const { doBitcoinRequest } = require( 'common-utilities' );
const {
    utils: { stringify }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const maxAllowedTriesToGetTheActualFee = 5;


const getTheActualFee = Object.freeze( async ({

    transactionId,
    attemptNumber = 1

}) => {

    console.log(
        `running getTheActualFee with the following values: ${
            stringify({
                transactionId,
            })
        }
        
            Attempt number ${ attemptNumber } of ${
                
                maxAllowedTriesToGetTheActualFee
            }.
        `
    );

    try {

        const getTransactionDataArgs = [
            'gettransaction',
            transactionId
        ];
        
        const transactionData = JSON.parse(
            
            await doBitcoinRequest({
            
                args: getTransactionDataArgs
            })
        );

        const theActualRawFee = transactionData.fee;

        if(
            (
                !theActualRawFee &&
                (theActualRawFee !== 0)
            ) ||
            (typeof theActualRawFee !== 'number')
        ) {

            // TODO: test error case
            throw new Error(
                
                `invalid theActualRawFee value: ${ theActualRawFee }`
            );
        }

        const theActualFee = Math.abs( theActualRawFee );

        console.log(
            `getTheActualFee
                executed successfully with the following values: ${
                        
                    stringify({
                    
                        transactionId,
                        attemptNumber
                    })

            }   here is the actual fee: ${ theActualFee }
            `
        );

        return theActualFee;
    }
    catch( err ) {
        
        if( attemptNumber >= maxAllowedTriesToGetTheActualFee ) {

            throw new Error(
                
                '😅unexpected ' +
                `error in getTheActualFee: ${ err.message }`
            );
        }

        console.log( 'normal error in getTheActualFee:', err );
        
        await bluebird.delay( 2000 );

        console.log( 'getTheActualFee - trying again' );

        return await getTheActualFee({

            transactionId,
            attemptNumber: attemptNumber + 1,
        });
    }
});


module.exports = getTheActualFee;
