'use strict';

const { database } = require( '../aws' );

const stringify = require( '../../stringify' );


const searchDatabase = Object.freeze( ({
    
    searchParams,
    theResolve = null,
    theReject = null,

}) => {

    const ultraLimit = searchParams.Limit;

    if( !ultraLimit ) {

        return Promise.reject( new Error( 'missing ultraLimit' ) );
    }

    console.log(
        
        'Running database.searchDatabase with the following values: ' +
        stringify({ searchParams })
    );

    return new Promise( (
        resolve, reject
    ) => database.query( searchParams, ( err, data = {} ) => {

        theResolve = theResolve || resolve;
        theReject = theReject || reject;

        if( !!err ) {

            console.log(
                'Error in database.searchDatabase ' +
                'with the following values: ' +
                stringify( searchParams )
            );
            
            return theReject( err );
        }

        const results = ( !!data.Items && data.Items ) || [];

        const ultimateResults = results.slice();

        if( !!data && !!data.LastEvaluatedKey ) {

            const paginationValue = Object.assign( {}, data.LastEvaluatedKey );

            console.log(
                'database.searchDatabase: ' +
                'the limit has been hit, returning the super response -- ' +
                `pagination value: ${ stringify( paginationValue ) }`
            );

            return theResolve({
                ultimateResults,
                paginationValue 
            });
        }

        console.log(
            'database.searchDatabase successfully executed, ' +
            `retrieved ${ ultimateResults.length } results`
        );
        
        theResolve({
            ultimateResults,
            paginationValue: null
        });
    }));
});


module.exports = searchDatabase;