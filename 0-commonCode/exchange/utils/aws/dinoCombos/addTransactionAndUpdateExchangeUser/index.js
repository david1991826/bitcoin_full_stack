'use strict';

const {
    utils: {
        doOperationInQueue,
        javascript: {
            getQueueId
        },
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api' );


const {
    aws: {
        database: {
            tableNames: {
                EXCHANGE_USERS
            }
        }
    },
    transactions,
} = require( '../../../../constants' );

const ensureExchangeUserExistsAndGet = require( './ensureExchangeUserExistsAndGet' );
const validateValues = require( './validateValues' );
const oracleHallucination = require( './oracleHallucination' );
const oracleFlashback = require( './oracleFlashback' );
const performDatabaseWrites = require( './performDatabaseWrites' );


const addTransactionAndUpdateExchangeUserCore = Object.freeze( async ({

    exchangeUserId,
    type,
    data

}) => {

    const exchangeUser = await ensureExchangeUserExistsAndGet({
        exchangeUserId
    });

    validateValues({

        exchangeUser,
        type,
        data,
    });

    const theOracleOfDelphiDefi = {

        [transactions.types.addBitcoin]: {

            theTransactionNeedsToBeAdded: false,
            addressToData: {}
        },

        [transactions.types.withdrawBitcoin]: {
            
            totalAmount: 0
        },

        [transactions.types.exchange]: {

            totalBitcoinAmount: 0,
            totalCryptoAmount: 0,
        },

        [transactions.types.dream]: {

            totalCryptoAmount: 0,
        },
    };

    const transactionToAdd = Object.assign(
        {
            exchangeUserId,
            type,
            // creationDate: Date.now(),
            creationDate: Date.now(),
        },
        data
    );

    await oracleHallucination({

        exchangeUserId,
        theOracleOfDelphiDefi,
        transactionToAdd,
    });

    oracleFlashback({

        theOracleOfDelphiDefi,
        transactionToAdd,
        exchangeUser
    });

    await performDatabaseWrites({

        exchangeUser,
        theOracleOfDelphiDefi,
        transactionToAdd,
    });
});


module.exports = Object.freeze( async ({

    exchangeUserId,
    type,
    data,
    noLocka = false

}) => {

    console.log(
        
        'running addTransactionAndUpdateExchangeUser ' +
        `with the following values: ${ stringify({

            exchangeUserId,
            type,
            data,
            noLocka,
        }) }`
    );

    const coreFunctionArgs = {

        exchangeUserId,
        type,
        data
    };

    if( noLocka ) {

        await addTransactionAndUpdateExchangeUserCore( coreFunctionArgs );
    }
    else {

        await doOperationInQueue({
        
            queueId: getQueueId({
                
                type: EXCHANGE_USERS,
                id: exchangeUserId
            }),
            
            doOperation: async () => {
                    
                await addTransactionAndUpdateExchangeUserCore(
                    coreFunctionArgs
                );
            }
        });
    }

    console.log(
        'addTransactionAndUpdateExchangeUser successfully executed'
    );
});