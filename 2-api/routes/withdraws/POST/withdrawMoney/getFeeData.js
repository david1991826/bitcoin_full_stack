
'use strict';

const {
    constants: {
        aws: {
            database: {
                tableNames: { METADATA },
                metadataPartitionKeyValues
            }
        },
    },
    utils: {
        aws: {
            dino: {
                getDatabaseEntry,
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api' );

// used by ePOST/withdraws
module.exports = Object.freeze( async () => {
    
    console.log( 'running getFeeData' );

    const tableName = METADATA;
    const value = metadataPartitionKeyValues.feeData;

    const feeData = await getDatabaseEntry({ tableName, value });

    console.log( 'getFeeData executed successfully' );

    return feeData;
});