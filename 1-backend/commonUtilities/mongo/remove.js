'use strict';

const {
    utils: {
        stringify
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze( async ({

    collection,
    query,
    justOne = true,

}) => {
    
    console.log(
        'running mongo.remove with the following values: ' +
        stringify({ query, justOne })
    );

    if( justOne ) {

        await collection.deleteOne( query );
    }
    else {

        await collection.deleteMany( query );
    }

    console.log( 'mongo.remove executed successfully' );
});