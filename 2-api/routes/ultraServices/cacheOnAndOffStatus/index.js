'use strict';

const getCacheOnAndOffStatus = require( './getCacheOnAndOffStatus' );
const addCacheOnAndOffStatusToRhino = require( './addCacheOnAndOffStatusToRhino' );


exports.handler = Object.freeze( async () => {

    console.log( '💃🏻Running cacheOnAndOffStatus' );

    try {

        const cacheOnAndOffStatus = await getCacheOnAndOffStatus();

        await addCacheOnAndOffStatusToRhino( cacheOnAndOffStatus );

        console.log( '👺💃🏻🐑cacheOnAndOffStatus executed successfully' );
    }
    catch( err ) {

        console.log( '🦌💃🏻error in cacheOnAndOffStatus:', err );
    }
});
