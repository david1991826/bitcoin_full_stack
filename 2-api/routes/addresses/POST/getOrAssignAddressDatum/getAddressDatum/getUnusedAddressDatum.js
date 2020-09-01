'use strict';

const {
    constants: {
        aws: {
            database: {
                tableNames: { ADDRESSES },
            }
        },
    },
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        stringify
    }
} = require( '@bitcoin-api.io/common-private' );

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        userId: '#userId',
        amount: '#amount',
        address: '#address',
        conversionDate: '#conversionDate',
        // timeUntilReclamationAfterConversionDate: '#timeUntilReclamationAfterConversionDate',
    }),

    nameValues: f({
     
        userId: 'userId',
        amount: 'amount',
        address: 'address',
        conversionDate: 'conversionDate',
        // timeUntilReclamationAfterConversionDate: 'timeUntilReclamationAfterConversionDate',
    }),

    valueKeys: f({

        userId: ':userId',
        amount: ':amount',
    }),

    valueValues: f({

        amount: 0,
    })
});


module.exports = f( async ({

    user,

}) => {
     
    console.log( 'running getUnusedAddressDatum' );

    const {

        nameKeys,
        nameValues,
        valueKeys,
        valueValues

    } = attributes;

    const searchParams = {
        TableName: ADDRESSES,
        ProjectionExpression: [
            nameKeys.address,
            nameKeys.conversionDate,
            // nameKeys.timeUntilReclamationAfterConversionDate,
        ].join( ', ' ),
        Limit: 10000,
        ScanIndexForward: false,
        KeyConditionExpression: (
            `${ nameKeys.userId } = ${ valueKeys.userId }`
        ),
        FilterExpression: (
            `${ nameKeys.amount } = ${ valueKeys.amount }`
        ),
        ExpressionAttributeNames: {
            [nameKeys.userId]: nameValues.userId,
            [nameKeys.amount]: nameValues.amount,
            [nameKeys.address]: nameValues.address,
            [nameKeys.conversionDate]: nameValues.conversionDate,
            // [nameKeys.timeUntilReclamationAfterConversionDate]: nameValues.timeUntilReclamationAfterConversionDate,
        },
        ExpressionAttributeValues: {
            [valueKeys.userId]: user.userId,
            [valueKeys.amount]: valueValues.amount,
        },
    };

    const addressData = (await searchDatabase({
        searchParams,
    })).ultimateResults;

    if( addressData.length < 1 ) {

        console.log(
            'getUnusedAddressDatum executed successfully, ' +
            'no addresses found for user'
        );

        return null;        
    }

    const unusedAddressDatum = addressData[0];

    console.log(
        'getUnusedAddressDatum executed successfully, there is one: ' +
        stringify( unusedAddressDatum )
    );

    return unusedAddressDatum;
});
