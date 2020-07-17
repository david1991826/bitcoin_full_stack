'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase
            }
        },
        stringify
    },
    constants: {
        aws: {
            database: {
                tableNames: {
                    WITHDRAWS
                },
                secondaryIndex: {
                    stateCreationDateIndex
                }
            }
        },
        withdraws: {
            states: {
                pending
            }
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        ultraKey: '#ultraKey',
        userId: '#userId',
        state: '#state',
        isExchangeWithdraw: '#isExchangeWithdraw',
        exchangeUserId: '#exchangeUserId',
    }),

    nameValues: f({
     
        ultraKey: 'ultraKey',
        userId: 'userId',
        state: 'state',
        isExchangeWithdraw: 'isExchangeWithdraw',
        exchangeUserId: 'exchangeUserId',
    }),

    valueKeys: f({

        state: ':state',
    }),

    valueValues: f({

        state: pending,
    })
});

const searchLimit = 1000;


const getPendingWithdrawData = Object.freeze( async ({

    pendingWithdrawData = [],
    paginationValueToUse = null,
    iterationCount = 0

} = {

    pendingWithdrawData: [],
    paginationValueToUse: null,
    iterationCount: 0

}) => {

    console.log(
        'running getPendingWithdrawData: ' +
        stringify({

            ['number of pending withdraw datas🐉']: pendingWithdrawData.length,
            paginationValueToUse,
            iterationCount
        })
    );
    
    const searchParams = {
        TableName: WITHDRAWS,
        IndexName: stateCreationDateIndex,
        ProjectionExpression: [
            attributes.nameKeys.ultraKey,
            attributes.nameKeys.userId,
            attributes.nameKeys.state,
            attributes.nameKeys.isExchangeWithdraw,
            attributes.nameKeys.exchangeUserId,
        ].join( ', ' ),
        Limit: searchLimit,
        ScanIndexForward: true,
        KeyConditionExpression: (
            `${ attributes.nameKeys.state } = ${ attributes.valueKeys.state }`
        ),
        ExpressionAttributeNames: {
            [attributes.nameKeys.state]: attributes.nameValues.state,
            [attributes.nameKeys.userId]: attributes.nameValues.userId,
            [attributes.nameKeys.ultraKey]: attributes.nameValues.ultraKey,
            [attributes.nameKeys.isExchangeWithdraw]: attributes.nameValues.isExchangeWithdraw,
            [attributes.nameKeys.exchangeUserId]: attributes.nameValues.exchangeUserId,
        },
        ExpressionAttributeValues: {
            [attributes.valueKeys.state]: attributes.valueValues.state,
        },
        ExclusiveStartKey: paginationValueToUse || undefined,
    };

    const {

        ultimateResults,
        paginationValue

    } = await searchDatabase({

        searchParams
    });

    pendingWithdrawData.push( ...ultimateResults );

    if( (ultimateResults.length < searchLimit) || !paginationValue ) {

        console.log(
            'getPendingWithdrawData executed successfully: ' +
            stringify({
    
                ['number of pending withdraw datas🐉 retrieved']: (
                    pendingWithdrawData.length
                ),
            })
        );

        return pendingWithdrawData;
    }

    return await getPendingWithdrawData({

        pendingWithdrawData,
        paginationValueToUse: paginationValue,
        iterationCount: iterationCount + 1,
    });
});


module.exports = getPendingWithdrawData;