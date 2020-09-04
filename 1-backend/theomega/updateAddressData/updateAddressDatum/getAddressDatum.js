'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            },
        }
    },
    constants: {
        aws: {
            database: {
                tableNames: { ADDRESSES },
                addressesTable: {
                    secondaryIndexNames: {
                        addressIndex
                    }
                }
            }
        }
    }
} = require( '@bitcoin-api.io/common-private' );

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
        // userId: '#userId',
        address: '#address',
        // amount: '#amount',
    }),

    nameValues: f({
        // userId: 'userId',
        address: 'address',
        // amount: 'amount',
    }),

    valueKeys: f({
        address: ':address',
    }),
});


module.exports = Object.freeze( async ({
    address
}) => {

    console.log( `running getAddressDatum with address: ${ address }` );

    const dynamicAttributes = f({
        valueValues: f({
            address
        }),
    });

    const searchParams = {
        TableName: ADDRESSES,
        IndexName: addressIndex,
        // ProjectionExpression: [].join( ', ' ),
        Limit: 5,
        KeyConditionExpression: (
            `${ attributes.nameKeys.address } = ${ attributes.valueKeys.address }`
        ),
        ExpressionAttributeNames: {
            // [attributes.nameKeys.userId]: attributes.nameValues.userId,
            [attributes.nameKeys.address]: attributes.nameValues.address,
            // [attributes.nameKeys.amount]: attributes.nameValues.amount,
        },
        ExpressionAttributeValues: {
            [attributes.valueKeys.address]: dynamicAttributes.valueValues.address
        },
    };

    const addressData = (
        await searchDatabase({
            searchParams,
            doSingleSearch: true
        })
    ).ultimateResults;

    if( addressData.length === 0 ) {

        console.log(

            'getAddressDatum executed successfully, ' +
            `no database address data found for address: ${ address }`
        );

        return null;
    }
    else if( addressData.length > 1 ) {
        // NOTE: safeguard: shouldn't get here in normal operation

        throw new Error(
            'updateAddressData: ' +
            'WEIRD ERROR: wrong number of addresses found: ' +
            addressData.length
        );
    }

    const addressDatum = addressData[ 0 ];

    console.log( 'getAddressDatum executed successfully' );

    return addressDatum;
});