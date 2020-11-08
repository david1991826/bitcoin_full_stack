'use strict';

const delay = require( '../../../delay' );

const stringify = require( '../../../stringify' );

const timeToWaitBeforeNextBatchPutInSeconds = 1;


module.exports = Object.freeze( ({

    data,
    tableName,
    entriesToPutNow,
    entriesToPutLater,
    putMultipleDatabaseEntries,
    theResolve,
    theReject

}) => {

    console.log(

        'running putMultipleDatabaseEntries.handleResponseData ' +
        'with the following values: ' +
        stringify({

            data,
            tableName,
            entriesToPutNow,
            entriesToPutLater,
        })
    );

    if( entriesToPutLater.length > 0 ) {

        const retryTime = timeToWaitBeforeNextBatchPutInSeconds * 1000;

        console.log(

            'putMultipleDatabaseEntries.handleResponseData ' +
            'executed successfully, there are still entries left to put ' +
            stringify( entriesToPutLater ) +
            ' retrying putMultipleDatabaseEntries in ' +
            `${ timeToWaitBeforeNextBatchPutInSeconds } seconds.`
        );

        return delay( retryTime ).then( () => {

            return putMultipleDatabaseEntries({

                tableName,
                entries: entriesToPutLater,
                theResolve,
                theReject
            });
        });
    }

    console.log(

        'database.putMultipleDatabaseEntries.handleResponseData executed ' +
        'successfully, put all requested entries: ' +
        '\n\n --- database.putMultipleDatabaseEntries is complete ---'
    );

    theResolve();
});