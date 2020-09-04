'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api.io/common-private' );


module.exports = Object.freeze( async ({

    collection,
    newValues,

}) => {
    
    console.log(
        'running batchPut with the following values: ' +
        stringify({ newValues })
    );

    await collection.insertMany( newValues );

    console.log( 'batchPut executed successfully' );
});