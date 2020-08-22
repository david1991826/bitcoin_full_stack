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

    emailAddresses,
    type,
    data,

}) => {

    console.log(

        'running addEEDRToDatabase with the following ' +
        'values: ' + 
        stringify({
            emailAddresses,
            type,
            data,
        })
    );

    for( const email of emailAddresses ) {

        const eedr = Object.assign(
            {
                email,
                type,
                creationDate: Date.now(),
            },
            data
        );

        await updateDatabaseEntry({

            tableName: EXCHANGE_EMAIL_DELIVERY_RESULTS,
            entry: eedr,
        });
    }

    console.log(
        'addEEDRToDatabase executed successfully'
    );
});
