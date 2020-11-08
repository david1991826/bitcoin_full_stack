'use strict';

const {
    constants: {
        redis: {
            keys
        }
    },
    utils: {
        // stringify,
        redis: {
            getClient,
            doRedisRequest
        },
    }
} = require( '@bitcoin-api/full-stack-api' );


module.exports = Object.freeze(async (
    
    cacheOnAndOffStatus

 ) => {
    
    console.log(
        'running addCacheOnAndOffStatusToRhino with rhino pond size: ' +
        cacheOnAndOffStatus.length
    );

    const redisClient = getClient();

    try {

        await doRedisRequest({

            client: redisClient,
            command: 'set',
            redisArguments: [
                keys.cacheOnAndOffStatus,
                cacheOnAndOffStatus
            ]
        });
    }
    catch( err ) {

        console.log( 'error in adding addCacheOnAndOffStatusToRhino', err );
    }

    console.log( 'addCacheOnAndOffStatusToRhino executed successfully' );

    redisClient.quit();
});
