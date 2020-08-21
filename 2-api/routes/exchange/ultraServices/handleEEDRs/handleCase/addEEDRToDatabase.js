'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        stringify,
    },
} = require( '@bitcoin-api.io/common-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_EMAIL_DELIVERY_RESULTS
                }
            }
        }
    },
} = require( '@bitcoin-api.io/common-exchange' );

// const getUuid = require( 'uuid' ).v4;


module.exports = Object.freeze( async ({

    emails,
    type,
    mainData,

}) => {

    console.log(

        'running addEEDRToDatabase with the following ' +
        'values: ' + 
        stringify({
            emails,
            type,
            mainData,
        })
    );

    for( const email of emails ) {

        const eedr = {

            email,
            type,
            creationDate: Date.now(),
            mainData,
        };

        // email  - creation date - type - mainData - lastUpdated
    
        await updateDatabaseEntry({

            tableName: EXCHANGE_EMAIL_DELIVERY_RESULTS,
            entry: eedr,
        });
    }

    console.log(
        'addEEDRToDatabase executed successfully'
    );
});
