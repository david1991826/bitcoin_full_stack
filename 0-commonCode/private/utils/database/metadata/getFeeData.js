'use strict';

const {
    constants: {
        withdraws: {
            limits: {
                maximumWithdrawAmount,
            }
        }
    }
} = require( '@bitcoin-api.io/common-general' );

const {

    aws: {
        database: {
            tableNameToKey,
            tableNames: { METADATA },
            metadataPartitionKeyValues
        }
    },

} = require( '../../../constants' );

const stringify = require( '../../stringify' );

const validateBusinessFeeData = Object.freeze( ({

    businessFeeData,

}) => {

    if(
        !businessFeeData ||
        (typeof businessFeeData !== 'object') ||
        Array.isArray( businessFeeData )
    ) {

        throw new Error(
            
            'validateBusinessFee: invalid business fee - ' +
            'business fee data does not exist or is not an object'
        );
    }

    const businessKeys = Object.keys( businessFeeData );
    
    for( const businessKey of businessKeys ) {

        const businessValue = businessFeeData[ businessKey ];

        if(
            !businessValue ||
            (typeof businessValue !== 'object') ||
            Array.isArray( businessValue )
        ) {
    
            throw new Error(
                
                'validateBusinessFee: invalid business fee data value ' +
                `associated with business key: "${ businessKey }"`
            );
        }

        if(
            (typeof businessValue.amount !== 'number') ||
            (businessValue.amount < 0) ||
            (businessValue.amount > maximumWithdrawAmount)
        ) {

            throw new Error(
                
                'validateBusinessFee: invalid business fee data amount ' +
                `associated with business key: "${ businessKey }"`
            );
        }
    }
});


module.exports = Object.freeze( ({

    fee,
    feeMultiplier,
    businessFeeData = {},
    megaServerId,

    noKeyProperty = false,

}) => {

    console.log( 'running getFeeData' );

    validateBusinessFeeData({

        businessFeeData,
    });
    
    const tableName = METADATA;

    const feeData = {

        amount: fee,
        multiplier: feeMultiplier,
        bitcoinNodeUrl: megaServerId,
        businessFeeData,
    };

    const shouldAddKeyProperty = !noKeyProperty;

    if( shouldAddKeyProperty ) {
        
        const key = tableNameToKey[ tableName ];

        feeData[ key ] = metadataPartitionKeyValues.feeData;
    }

    console.log(
        'getFeeData executed successfully - ' +
        `got fee data ${ stringify( feeData ) }`
    );

    return feeData;
});