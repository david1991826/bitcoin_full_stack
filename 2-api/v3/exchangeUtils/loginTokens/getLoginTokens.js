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
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    LOGIN_TOKENS
                },
            }
        }
    }
} = require( '@npm.m.stecky.efantis/common-exchange' );

const {
    loginTokens: {
        expiryTime,
        numberOfAllowedSignedInLoginTokens
    }
} = require( '../constants' );

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        exchangeUserId: '#exchangeUserId',
        expiryTime: '#expiryTime',
        loginTokenId: '#loginTokenId',
        signedOut: '#signedOut',
    }),

    nameValues: f({
     
        exchangeUserId: 'exchangeUserId',
        expiryTime: 'expiryTime',
        loginTokenId: 'loginTokenId',
        signedOut: 'signedOut',
    }),

    valueKeys: f({

        exchangeUserId: ':exchangeUserId',
        startTime: ':startTime',
        endTime: ':endTime',
    }),

    // valueValues: f({

    //     signedOut: true,
    // }),
});

const searchLimit = 1000;


const getLoginTokens = Object.freeze( async ({

    exchangeUserId,
    loginTokens = [],
    paginationValueToUse = null,
    iterationCount = 0,
    searchStartTime = Date.now(),
    searchEndTime,
    shouldOnlyGetInitialTokens,
    shouldGetFullLoginTokenInfo,

}) => {

    if( !searchEndTime ) {

        searchEndTime = searchStartTime + expiryTime;
    }

    const searchLimitToUse = shouldOnlyGetInitialTokens ? (

        numberOfAllowedSignedInLoginTokens

    ) : searchLimit;

    console.log(
        'running getLoginTokens: ' +
        stringify({

            ['number of login tokens🐉']: loginTokens.length,
            exchangeUserId,
            paginationValueToUse,
            iterationCount,
            searchStartTime,
            searchEndTime,
            shouldGetFullLoginTokenInfo,
            searchLimitToUse,
        })
    );

    const searchParams = {
        TableName: LOGIN_TOKENS,
        // IndexName: stateCreationDateIndex,
        Limit: searchLimitToUse,
        ScanIndexForward: false,
        KeyConditionExpression: (
            `${ attributes.nameKeys.exchangeUserId } = ` +
            `${ attributes.valueKeys.exchangeUserId } and ` +
            `${ attributes.nameKeys.expiryTime } between ` +
            `${ attributes.valueKeys.startTime } and ` +
            attributes.valueKeys.endTime
        ),
        // FilterExpression: (
        //     `${ attributes.nameKeys.signedOut } <> ${ attributes.valueKeys.signedOut }`
        // ),
        ExpressionAttributeNames: {
            [attributes.nameKeys.exchangeUserId]: attributes.nameValues.exchangeUserId,
            [attributes.nameKeys.expiryTime]: attributes.nameValues.expiryTime,
            // [attributes.nameKeys.signedOut]: attributes.nameValues.signedOut,
            // [attributes.nameKeys.loginTokenId]: attributes.nameValues.loginTokenId,
        },
        ExpressionAttributeValues: {
            [attributes.valueKeys.exchangeUserId]: exchangeUserId,
            [attributes.valueKeys.startTime]: searchStartTime,
            [attributes.valueKeys.endTime]: searchEndTime,
            // [attributes.valueKeys.signedOut]: attributes.valueValues.signedOut
        },
        ExclusiveStartKey: paginationValueToUse || undefined,
    };

    if( !shouldGetFullLoginTokenInfo ) {

        searchParams.ProjectionExpression = [
            attributes.nameKeys.expiryTime,
            attributes.nameKeys.loginTokenId,
            attributes.nameKeys.signedOut,
        ];

        Object.assign(

            searchParams.ExpressionAttributeNames,
            {
                [attributes.nameKeys.loginTokenId]: attributes.nameValues.loginTokenId,
                [attributes.nameKeys.signedOut]: attributes.nameValues.signedOut,
            }
        );
    }

    const {

        ultimateResults,
        paginationValue

    } = await searchDatabase({

        searchParams
    });

    loginTokens.push( ...ultimateResults );

    if(
        (ultimateResults.length < searchLimit) ||
        !paginationValue ||
        shouldOnlyGetInitialTokens
    ) {

        console.log(
            'getLoginTokens executed successfully: ' +
            stringify({
    
                ['number of login token datas🐉 retrieved']: (
                    loginTokens.length
                ),
            })
        );

        return loginTokens;
    }

    return await getLoginTokens({

        exchangeUserId,
        loginTokens,
        paginationValueToUse: paginationValue,
        iterationCount: iterationCount + 1,
        searchStartTime,
        searchEndTime,
        shouldGetFullLoginTokenInfo
    });
});


module.exports = getLoginTokens;
