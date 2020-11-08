'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api/full-stack-api' );


module.exports = Object.freeze( async ({

    collection,
    query = {},
    queryOptions = {},
    projectionOptions,
    sortOptions,

}) => {
    
    console.log(
        'running mongo search with the following values: ' +
        stringify({ query, queryOptions })
    );

    const results = await new Promise( ( resolve, reject ) => {

        const mongoSearch = collection.find(

            query,
            queryOptions,
        );

        if( !!projectionOptions ) {

            mongoSearch.project( projectionOptions );
        }

        if( !!sortOptions ) {

            mongoSearch.sort( sortOptions );
        }

        mongoSearch.toArray( ( err, data ) => {

            if( !!err ) {

                return reject( err );
            }

            resolve( data );
        });
    });

    console.log(
        'mongo search executed successfully - ',
        `got ${ results.length } results`
    );

    return results;
});