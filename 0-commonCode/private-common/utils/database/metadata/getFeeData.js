'use strict';

const {

    aws: {
        database: {
            tableNameToKey,
            tableNames: { METADATA },
            metadataPartitionKeyValues
        }
    },

} = require( '../../../constants' );

const stringify = require( '../../../utils/stringify' );


module.exports = Object.freeze( ({

    fee,
    feeMultiplier,
    blessingFee = 0,
    trinityFee = 0,
    sacramentFee = 0,
    megaServerId,

    noKeyProperty = false,

}) => {

    console.log( 'running getFeeData' );
    
    const tableName = METADATA;

    const feeData = {

        amount: fee,
        multiplier: feeMultiplier,
        bitcoinNodeUrl: megaServerId,
        blessingFee,
        trinityFee,
        sacramentFee,
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
