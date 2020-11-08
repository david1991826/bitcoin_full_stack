'use strict';

const {
    constants: {
        aws: {
            database: {
                tableNames: { METADATA },
                metadataPartitionKeyValues
            }
        }
    },
    utils: {
        database: { metadata: { getFeeToPayFromFeeData } },
        stringify,
        aws: {
            dino: {
                getDatabaseEntry
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api' );


module.exports = Object.freeze( async () => {
    
    console.log( 'running getFeeData' );
    
    const feeData = await getDatabaseEntry({

        tableName: METADATA,
        value: metadataPartitionKeyValues.feeData,
    });

    const fee = getFeeToPayFromFeeData({

        feeData
    });

    const feeDataToReturn = {
        fee,
        // time: feeData.lastUpdated
    };

    console.log(
        
        'getFeeData executed successfully ' +
        `returning values: ${ stringify( feeDataToReturn ) }`
    );

    return feeDataToReturn;
});
