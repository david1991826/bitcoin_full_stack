'use strict';

const { database } = require( '../aws' );

const stringify = require( '../../stringify' );


module.exports = Object.freeze( ({

    tableName,
    entry

}) => {

    const TableName = tableName;
    const Item = Object.assign(
        entry,
        {
            lastUpdated: Date.now(),
        }
    );

    const params = {

        TableName,
        Item
    };

    console.log(

        'Running database.updateDatabaseEntry with the following values: ' +
        stringify( params )
    );

    return new Promise(

        ( resolve, reject ) => database.put( params, ( err, data ) => {

            if( !!err ) {

                console.log(

                    'Error in database.updateDatabaseEntry ' +
                    'with the following values: ' +
                    stringify( params )
                );

                return reject( err );
            }

            console.log(

                'database.updateDatabaseEntry successfully executed'
            );

            resolve( data );
        })
    );
});
