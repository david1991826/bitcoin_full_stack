'use strict';

const { database } = require( '../../aws' );

const stringify = require( '../../../stringify' );

const getEntriesToPutNowAndToPutLater = require(
    
    './getEntriesToPutNowAndToPutLater'
);

const getParams = require( './getParams' );

const handleUnprocessedItems = require( './handleUnprocessedItems' );

const handleResponseData = require( './handleResponseData' );


const putMultipleDatabaseEntries = Object.freeze( ({

    tableName,
    entries,
    theResolve = null,
    theReject = null

}) => {
    
    console.log(

        'running putMultipleDatabaseEntries.index ' +
        'with the following values: ' +
        stringify({ tableName, entries })
    );

    const {
        
        entriesToPutNow,
        entriesToPutLater
        
    } = getEntriesToPutNowAndToPutLater({ entries });

    const params = getParams({ tableName, entriesToPutNow })

    console.log(

        'database.putMultipleDatabaseEntries.index - ' +
        `entriesToPutNow: ${ stringify( entriesToPutNow ) }, ` +
        `params: ${ stringify( params ) }, `
    );

    return new Promise((

        resolve,
        reject

    ) => database.batchWrite( params, ( err, data ) => {
        
        theResolve = theResolve || resolve;
        theReject = theReject || reject;

        if( !!err ) {

            console.log(

                'Error in batchWrite with the following values: ' +
                stringify( params )
            );

            return theReject( err );
        }

        console.log(

            'database.putMultipleDatabaseEntries.index: ' +
            'aws.database.batchWrite retrieved results: ' +
            stringify( data )
        );

        if(
            !!data.UnprocessedItems &&
            (Object.keys( data.UnprocessedItems ).length > 0) 
        ) {

            return handleUnprocessedItems({

                putMultipleDatabaseEntries,
                tableName,
                entries,
                theResolve,
                theReject,
            });
        }

        return handleResponseData({

            data,
            tableName,
            entriesToPutNow,
            entriesToPutLater,
            putMultipleDatabaseEntries,
            theResolve,
            theReject
        });
    }));
});


module.exports = putMultipleDatabaseEntries;