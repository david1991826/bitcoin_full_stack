'use strict';

const getClient = require( './getClient' );


module.exports = Object.freeze( async ({

    performFunction = async () => {},
    args = [],
    functionName = 'function'

}) => {
    
    console.log( `💘🦏running doRedisFunction for ${ functionName }` );

    const redisClient = getClient();

    try {

        const results = await performFunction(
            {
                redisClient
            },
            ...args
        );

        redisClient.quit();

        console.log(
            '💘🦏doRedisFunction executed successfully ' +
            `for ${ functionName }`
        );

        return results;
    }
    catch( err ) {

        redisClient.quit();

        console.log(
            
            `💘🦏error in doRedisFunction for ${ functionName }:`,
            err
        );

        throw err;
    }
});
