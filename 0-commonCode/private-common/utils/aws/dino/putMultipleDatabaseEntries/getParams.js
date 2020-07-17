'use strict';

const stringify = require( '../../../stringify' );


module.exports = Object.freeze( ({ tableName, entriesToPutNow }) => {

    console.log(

        'running putMultipleDatabaseEntries.getParams ' +
        'with the following values: ' +
        stringify({ tableName, entriesToPutNow })
    );

    const putCommands = [];

    for( const entry of entriesToPutNow ) {

        putCommands.push({ PutRequest: { Item: entry } });
    }

    const params = { RequestItems: { [ tableName ]: putCommands } };

    console.log(

        'putMultipleDatabaseEntries.getParams executed successfully ' +
        `returning params: ${ stringify( params ) }`
    );

    return params;
});
