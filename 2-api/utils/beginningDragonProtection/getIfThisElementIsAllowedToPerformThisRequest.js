'use strict';

const stringify = require( '../stringify' );

const {
    utils: {
        redis: {
            streams: {
                // getOperationTime,
                xRangeWithPagination,
                getKeyValues
            }
        },
    }
} = require( '@bitcoin-api.io/common-private' );


module.exports = Object.freeze( async ({

    elementalQueueId,
    maxRate = 1,
    timeRange = 1000 * 60 * 60 * 24,
    redisClient,
    powerQueueId,
    thePowerOfNow,
    veryPreviousOperationTimeKey

}) => {

    const searchStart = thePowerOfNow - timeRange;
    const searchEnd = veryPreviousOperationTimeKey;

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'running getIfThisElementIsAllowedToPerformThisRequest: ' +
        stringify({
            elementalQueueId,
            maxRate,
            timeRange,
            searchStart,
            searchEnd,
            powerQueueId
        })
    );

    const requestsInTimeRangeToConsider = await xRangeWithPagination({

        redisClient,
        startTime: searchStart,
        endTime: searchEnd,
    
        queueName: elementalQueueId,
        paginationCount: 100,
    }); 

    const data = requestsInTimeRangeToConsider.map( entry => {

        return {
            // timeKey: entry[0],
            keyValues: getKeyValues({
                keyValueList: entry[1],
            }),
        };
    });

    const numberOfRequestsInTimeFrame = data.filter(
        
        entry => (entry.keyValues.powerQueueId === powerQueueId)

    ).length;

    const hashedElementIsAllowedToPerformRequest = (

        numberOfRequestsInTimeFrame <= maxRate  
    );

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 -\n' +
        'number of requests in the time frame: ' +
        `${ numberOfRequestsInTimeFrame }\n` +
        `max rate in time frame: ${ maxRate }\n` +
        stringify({ hashedElementIsAllowedToPerformRequest }) +
        '\ngetIfThisElementIsAllowedToPerformThisRequest ' +
        'executed successfully.'
    );
    
    return hashedElementIsAllowedToPerformRequest;
});
