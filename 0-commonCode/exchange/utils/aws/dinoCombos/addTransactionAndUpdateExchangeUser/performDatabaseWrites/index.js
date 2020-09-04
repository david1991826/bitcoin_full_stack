'use strict';

const {

    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        stringify
    },

} = require( '@bitcoin-api.io/common-private' );

const {
    aws: {
        database: {
            tableNames: {
                TRANSACTIONS
            },
        }
    },
    transactions: {
        types,
    }
} = require( '../../../../../constants' );

const getTransactionId = require( './getTransactionId' );
const getNewBitcoinData = require( './getNewBitcoinData' );
const getBitcoinWithdrawsData = require( './getBitcoinWithdrawsData' );
const getExchangeData = require( './getExchangeData' );
const getDreamData = require( './getDreamData' );
const updateExchangeUser = require( '../../updateExchangeUser' );


module.exports = Object.freeze( async ({

    exchangeUser,
    theOracleOfDelphiDefi,
    transactionToAdd,

}) => {

    console.log(
        
        'running performDatabaseWrites with the following values: ' +
        stringify({
            exchangeUser,
            theOracleOfDelphiDefi,
            transactionToAdd
        })
    );

    const databaseWrites = [];

    const newMoneyData = {

        bitcoin: getNewBitcoinData({

            exchangeUser,
            theOracleOfDelphiDefi,
        }),

        bitcoinWithdraws: getBitcoinWithdrawsData({

            theOracleOfDelphiDefi,
        }),

        exchange: getExchangeData({

            theOracleOfDelphiDefi,
        }),

        dream: getDreamData({

            theOracleOfDelphiDefi,
        })
    };

    console.log(
        'adding new money data to exchange user: ' +
        stringify( newMoneyData )
    );

    databaseWrites.push(

        updateExchangeUser({
            
            newExchangeUser: Object.assign(

                {},
                exchangeUser,
                {
                    moneyData: newMoneyData
                }
            )
        })
    );

    const theTransactionNeedsToBeAdded = !(

        (transactionToAdd.type === types.addBitcoin) &&
        !theOracleOfDelphiDefi[
            types.addBitcoin
        ].theTransactionNeedsToBeAdded
    );

    if( theTransactionNeedsToBeAdded ) {
        
        console.log( '📜performDatabaseWrites - adding transaction✅' );
        
        databaseWrites.push(

            updateDatabaseEntry({

                tableName: TRANSACTIONS,
                entry: Object.assign(

                    {},
                    transactionToAdd,
                    {
                        transactionId: getTransactionId(),
                    }
                ),
            })
        );
    }
    else {

        console.log( '📜performDatabaseWrites - not adding transaction❎' );
    }

    await Promise.all( databaseWrites );

    console.log(
        
        'performDatabaseWrites executed successfully'
    );
});
