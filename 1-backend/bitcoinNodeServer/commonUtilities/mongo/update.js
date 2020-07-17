'use strict';

const {
    utils: {
        stringify
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze( async ({

    collection,
    query,
    newValue,
    createIfDoesNotExist = true,

}) => {
    
    console.log(
        'running updateMongoEntry with the following values: ' +
        stringify({ query, newValue })
    );

    await collection.updateOne(
        query,
        newValue,
        {
            upsert: createIfDoesNotExist,
        }
    );

    console.log( 'updateMongoEntry executed successfully' );
});