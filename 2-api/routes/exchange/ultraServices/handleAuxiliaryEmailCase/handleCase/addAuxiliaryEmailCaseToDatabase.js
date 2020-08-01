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
                    AUXILIARY_EMAIL_CASES
                }
            }
        }
    },
} = require( '@bitcoin-api.io/common-exchange' );

const getUuid = require( 'uuid' ).v4;


module.exports = Object.freeze( async ({

    emails,
    type,
    metaData,

}) => {

    console.log(

        'running addAuxiliaryEmailCaseToDatabase with the following ' +
        'values: ' + 
        stringify({
            emails,
            type,
        })
    );

    for( const email of emails ) {

        const auxiliaryEmailCase = {

            caseId: getUuid(),
            email,
            type,
            creationDate: Date.now(),
            metaData,
        };
    
        await updateDatabaseEntry({

            tableName: AUXILIARY_EMAIL_CASES,
            entry: auxiliaryEmailCase,
        });
    }

    console.log(
        'addAuxiliaryEmailCaseToDatabase executed successfully'
    );
});
