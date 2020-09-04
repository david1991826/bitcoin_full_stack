'use strict';

const searchDatabase = require( '../../../dino/searchDatabase' );
const getIfAddressShouldBeReclaimed = require( '../../../../database/addresses/getIfAddressShouldBeReclaimed' );

const {

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
    
} = require( '../../../../../constants' );

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
        address: '#address',
    }),

    nameValues: f({
        address: 'address',
    }),

    valueKeys: f({
        address: ':address',
    }),
});


module.exports = Object.freeze( async ({

    address

}) => {

    const dynamicAttributes = f({

        valueValues: f({

            address,
        }),
    });

    const searchParams = {
        TableName: ADDRESSES,
        IndexName: addressIndex,
        // ProjectionExpression: [].join( ', ' ),
        Limit: 5,
        KeyConditionExpression: (
            `${ attributes.nameKeys.address } = ` +
            `${ attributes.valueKeys.address }`
        ),
        ExpressionAttributeNames: {
            [attributes.nameKeys.address]: attributes.nameValues.address,
        },
        ExpressionAttributeValues: {
            [attributes.valueKeys.address]: dynamicAttributes.valueValues.address,
        },
    };

    const addressData = (
        await searchDatabase({
            searchParams,
            doSingleSearch: true
        })
    ).ultimateResults;

    if( addressData.length === 0 ) {

        throw new Error(
            'reclaimAddress error🦍: ' +
            `address ${ address } does not exist`
        );
    }
    else if( addressData.length > 1 ) {

        throw new Error(
            'reclaimAddress error🦍: ' +
            `weird error, multiple (${ addressData.length }) ` +
            `found when searching for address: ${ address }`
        );
    }

    const existingAddressDatum = addressData[ 0 ];

    const addressShouldBeReclaimed = getIfAddressShouldBeReclaimed({

        addressDatum: existingAddressDatum
    });

    return {

        existingAddressDatum,
        addressShouldBeReclaimed
    };
});
