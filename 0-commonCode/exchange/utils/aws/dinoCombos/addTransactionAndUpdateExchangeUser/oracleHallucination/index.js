'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        stringify
    },
} = require( '@bitcoin-api/full-stack-api' );

const {
    aws: {
        database: {
            tableNames: {
                TRANSACTIONS
            },
            secondaryIndices: {
                exchangeUserIdCreationDateIndex,
            }
        }
    },
} = require( '../../../../../constants' );

const processTransactions = require( './processTransactions' );

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        exchangeUserId: '#exchangeUserId',
    }),

    nameValues: f({
     
        exchangeUserId: 'exchangeUserId',
    }),

    valueKeys: f({

        exchangeUserId: ':exchangeUserId',
    }),
});

const searchLimit = 5000;


const oracleHallucination = Object.freeze( async ({

    exchangeUserId,
    theOracleOfDelphiDefi,
    withdrawIdToData = {}, 
    transactionToAdd = null,

    paginationValueToUse = null,
    iterationCount = 0

}) => {

    console.log(
        '🐐☢️⏫⏫⏫running oracleHallucination: ' +
        stringify({

            exchangeUserId,
            theOracleOfDelphiDefi,
            transactionToAdd,
            paginationValueToUse,
            iterationCount
        })
    );
    
    const searchParams = {
        TableName: TRANSACTIONS,
        IndexName: exchangeUserIdCreationDateIndex,
        Limit: searchLimit,
        ScanIndexForward: true,
        KeyConditionExpression: (
            `${ attributes.nameKeys.exchangeUserId } = ${ attributes.valueKeys.exchangeUserId }`
        ),
        ExpressionAttributeNames: {
            [attributes.nameKeys.exchangeUserId]: attributes.nameValues.exchangeUserId,
        },
        ExpressionAttributeValues: {
            [attributes.valueKeys.exchangeUserId]: exchangeUserId,
        },
        ExclusiveStartKey: paginationValueToUse || undefined,
    };

    const {

        ultimateResults,
        paginationValue

    } = await searchDatabase({

        searchParams
    });

    const transactions = ultimateResults.slice();

    processTransactions({

        transactions,
        theOracleOfDelphiDefi,
        withdrawIdToData
    });

    if( (ultimateResults.length < searchLimit) || !paginationValue ) {

        if( !!transactionToAdd ) {

            processTransactions({

                transactions: [
                    transactionToAdd
                ],
                theOracleOfDelphiDefi,
                withdrawIdToData
            });
        }

        return console.log(
            '🐐☢️⏫⏫⏫oracleHallucination executed successfully - ' + 
            `${ stringify({ theOracleOfDelphiDefi })}`
        );
    }

    return await oracleHallucination({

        exchangeUserId,
        theOracleOfDelphiDefi,
        paginationValueToUse: paginationValue,
        iterationCount: iterationCount + 1,
        withdrawIdToData,
    });
});


module.exports = oracleHallucination;
