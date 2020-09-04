'use strict';

const {

    utils: {
        aws: {
            dinoCombos: {
                balances: {
                    verifyBalanceOnNewWithdraw
                }
            }
        },
        stringify,
        javascript,
    }
} = require( '@bitcoin-api.io/common-private' );

const doTheActualWithdraw = require( './doTheActualWithdraw' );
const realDealTheWithdraw = require( './realDealTheWithdraw' );
const addTransactionAndUpdateExchangeUserDeluxe = require( './addTransactionAndUpdateExchangeUserDeluxe' );

const { backgroundExecutor } = require( '../utils' );


const getVanguardValues = Object.freeze( ({

    pendingWithdrawDatum: {
        
        isExchangeWithdraw,
        exchangeUserId,
        userId
    }

}) => {

    if( isExchangeWithdraw ) {

        return {

            getQueueId: javascript.getVanguardQueueId,
            idForGetQueueId: exchangeUserId,
            isExchangeWithdraw
        };
    }

    return {

        getQueueId: javascript.getQueueId,
        idForGetQueueId: userId,
        isExchangeWithdraw 
    };
});


module.exports = Object.freeze( async ({

    pendingWithdrawData

}) => {

    console.log(
        `Running doWithdraws for ${ pendingWithdrawData.length } ` +
        'pending withdraws.'
    ); 

    try {

        for( const pendingWithdrawDatum of pendingWithdrawData ) {

            const {

                getQueueId,
                idForGetQueueId,
                isExchangeWithdraw

            } = getVanguardValues({ pendingWithdrawDatum });

            console.log(

                'doWithdraws vanguard values: ' + 
                stringify({
                    idForGetQueueId,
                    isExchangeWithdraw 
                })
            );

            const {

                withdrawOccurredSuccessfully,

            } = await doTheActualWithdraw({

                pendingWithdrawDatum,
                getQueueId,
                idForGetQueueId,
            });

            if( withdrawOccurredSuccessfully ) {

                backgroundExecutor.addOperation({

                    operation: async () => {
    
                        await realDealTheWithdraw({
    
                            userId: pendingWithdrawDatum.userId,
                            ultraKey: pendingWithdrawDatum.ultraKey,
                            getQueueId,
                            idForGetQueueId,
                        });
                    }
                });
            }

            backgroundExecutor.addOperation({

                operation: async () => {

                    await verifyBalanceOnNewWithdraw({

                        userId: pendingWithdrawDatum.userId,
                        ultraKey: pendingWithdrawDatum.ultraKey,

                        isExchangeWithdraw,
                        idForGetQueueId,
                        addTransactionAndUpdateExchangeUserDeluxe: (
                            async () => {}
                            // getAddTransactionAndUpdateExchangeUserDeluxe({

                            //     userId: pendingWithdrawDatum.userId,
                            //     ultraKey: pendingWithdrawDatum.ultraKey,
                            // })
                        ),
                    });
                }
            });

            if( isExchangeWithdraw ) {

                backgroundExecutor.addOperation({

                    operation: async () => {
    
                        await addTransactionAndUpdateExchangeUserDeluxe({
                            
                            exchangeUserId: pendingWithdrawDatum.exchangeUserId,
                            userId: pendingWithdrawDatum.userId,
                            ultraKey: pendingWithdrawDatum.ultraKey,
                        });
                    }
                });
            }
        }

        console.log( 'doWithdraws - executed successfully' );
    }
    catch( err ) {

        const results = {

            unexpectedError: err
        };

        console.log(
            'doWithdraws - executed successfully (error case!) - ' +
            'an error occurred, ' +
            `returning results: ${ stringify( results ) }`
        );

        return results;
    }
});