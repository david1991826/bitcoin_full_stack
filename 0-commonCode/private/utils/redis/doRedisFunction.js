'use strict';

const drf = require( 'drf' );


module.exports = Object.freeze( async ({

    performFunction,
    args,
    functionName,

}) => {

    const drfResults = await drf({

        redisFunction: performFunction,
        args,
        functionName,
    });

    return drfResults;
});

