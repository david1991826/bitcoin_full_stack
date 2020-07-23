'use strict';

const doRedisRequest = require( '../doRedisRequest' );
// const getOperationTime = require( './getOperationTime' );
const getIncrementedTimeKeyData = require( './getIncrementedTimeKeyData' );


const xRangeWithPagination = Object.freeze( async ({

    redisClient,
    startTime,
    endTime,

    queueName,
    paginationCount,

    results = [],

}) => {

    const xRangeResults = await doRedisRequest({

        client: redisClient,
        command: 'xrange',
        redisArguments: [
            queueName,
            startTime,
            endTime,
            'COUNT',
            paginationCount
        ]
    });

    results.push( ...xRangeResults );

    const lastTimeKey = (
        
        !!xRangeResults[ xRangeResults.length - 1 ] &&
        xRangeResults[ xRangeResults.length - 1 ][0]
    ); 

    if(
        !lastTimeKey ||
        // (
        //     getOperationTime({
                
        //         operationTimeKey: lastTimeKey

        //     }) === endTime

        // ) ||
        (xRangeResults.length < paginationCount)
    ) {

        return results;
    }

    return await xRangeWithPagination({

        redisClient,
        startTime: getIncrementedTimeKeyData({
            timeKey: lastTimeKey
        }),
        endTime,
        results,

        queueName,
        paginationCount 
    });
});


module.exports = xRangeWithPagination;