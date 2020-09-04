'use strict';

const stringify = require( '../../../stringify' );

const MAX_NUMBER_OF_ENTRIES_TO_PUT_AT_ONCE = 2;


module.exports = Object.freeze( ({ entries }) => {

    console.log(

        'running putMultipleDatabaseEntries.getEntriesToPutNowAndToPutLater ' +
        `with the following values: ${ stringify({ entries }) }`
    );

    const entriesToPutNow = [];
    const entriesToPutLater = [];

    for( let i = 0; i < entries.length; i++ ) {

        if( i < MAX_NUMBER_OF_ENTRIES_TO_PUT_AT_ONCE ) {

            entriesToPutNow.push( entries[i] );
        }
        else {

            entriesToPutLater.push( entries[i] );
        }
    }

    console.log(

        'putMultipleDatabaseEntries.getEntriesToPutNowAndToPutLater ' +
        'executed successfully ' +
        `returning values: ${ stringify({
        
            entriesToPutNow,
            entriesToPutLater,
        })}`
    );

    return {
        
        entriesToPutNow,
        entriesToPutLater,
    };
});
