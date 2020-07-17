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
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze( async () => {
    
    console.log( 'running getFeeData' );
    
    const feeData = await getDatabaseEntry({

        tableName: METADATA,
        value: metadataPartitionKeyValues.feeData,
    });

    const fee = getFeeToPayFromFeeData({

        feeData
    });

    const theFeeDataInQuotes = {
        fee,
        // time: feeData.lastUpdated
    };

    console.log(
        
        'getFeeData executed successfully ' +
        `returning values: ${ stringify( theFeeDataInQuotes ) }`
    );

    return theFeeDataInQuotes;
});
