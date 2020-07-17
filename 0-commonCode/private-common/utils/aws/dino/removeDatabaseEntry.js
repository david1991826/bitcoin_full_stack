'use strict';

const { database } = require( '../aws' );

const stringify = require( '../../stringify' );


module.exports = Object.freeze( ({

    tableName,
    keyObject

}) => {

    const TableName = tableName;
    const Key = keyObject;

    const params = { TableName, Key };

    console.log(

        'Running database.removeDatabaseEntry with the following values: ' +
        stringify( params )
    );

    return new Promise( (
        resolve,
        reject
    ) => database.delete( params, err => {

        if( !!err ) {

            console.log(

                'Error in database.removeDatabaseEntry ' +
                'with the following values: ' +
                stringify( params )
            );

            return reject( err );
        }

        console.log(

            'database.removeDatabaseEntry successfully executed'
        );

        resolve();
    }));
});
