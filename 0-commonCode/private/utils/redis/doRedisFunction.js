'use strict';

const drf = require( 'drf' );


module.exports = Object.freeze( async ({

    performFunction,
    functionName,

}) => {

    return await drf({

        redisFunction: performFunction,
        functionName,
    });
});

