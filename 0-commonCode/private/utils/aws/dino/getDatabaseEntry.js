'use strict';

const { database } = require( '../aws' );

const stringify = require( '../../stringify' );

const {
    
    aws: { database: { tableNameToKey, tableNameToSortKey } }

} = require( '../../../constants' );


module.exports = Object.freeze( ({
    
    tableName,
    value,
    sortValue,
    key,
    sortKey,

}) => {

    key = key || tableNameToKey[ tableName ];

    const TableName = tableName;

    const Key = {

        [ key ]: value,
    };

    if( !!sortValue ) {

        sortKey = sortKey || tableNameToSortKey[ tableName ];

        Key[ sortKey ] = sortValue;
    }

    const params = { TableName, Key };

    console.log(
        
        'Running database.getDatabaseEntry with the following values:',
        stringify( params )
    );

    return new Promise(
        
        ( resolve, reject ) => database.get( params, ( err, data ) => {

            if( !!err ) {

                console.log(
        
                    'Error in database.getDatabaseEntry',
                    'with the following values:',
                    stringify( params )
                );
                
                return reject( err );
            }

            const result = (

                !!data &&
                !!data.Item &&
                data.Item

            ) || null;

            console.log(

                'database.getDatabaseEntry successfully executed',
                `returning data: ${
                    
                    !!result ? JSON.stringify( Object.keys( result ) ) : result
                }`
            );
            
            resolve( result );
        })
    );
});