'use strict';

const delay = require( '../../../delay' );

const stringify = require( '../../../stringify' );

const RETRY_DELAY_TIME_IN_SECONDS = 10;


module.exports = Object.freeze( ({

    putMultipleDatabaseEntries,
    tableName,
    entries,
    theResolve,
    theReject

}) => {

    console.log(

        'running putMultipleDatabaseEntries.handleUnprocessedItems',
        'with the following values:',
        stringify({ tableName, entries })
    );

    const errorMessage = (

        'putMultipleDatabaseEntries.handleUnprocessedItems ' +
        'unable to put all entries using entries: ' +
        stringify( entries ) +
        ` retrying again in ${ RETRY_DELAY_TIME_IN_SECONDS } ` +
        'seconds'
    );

    console.log( errorMessage );

    const waitTime = RETRY_DELAY_TIME_IN_SECONDS * 1000;

    return delay( waitTime ).then( () => {

        console.log(

            'putMultipleDatabaseEntries.handleUnprocessedItems ' +
            'running putMultipleDatabaseEntries again with the following ' +
            `values: ${ stringify({ tableName, entries }) }`
        );

        return putMultipleDatabaseEntries({

            tableName,
            entries,
            theResolve,
            theReject
        });
    });
});

