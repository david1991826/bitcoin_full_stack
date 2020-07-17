'use strict';

const crypto = require( 'crypto' );
// const stringify = require( '../stringify' );

const {
    utils: {
        redis: {
            doRedisRequest,
            streams: {
                getOperationTime,
                getIncrementedTimeKeyData
            }
        },
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    utils: {
        getPowerQueueId
    },
    constants: {
        dragonErrorStatusCode,
        ipAddressRateLimiterQueueId,
        maxRateLimiterStreamLength
    },
} = require( './localTools' );

const getIfThisElementIsAllowedToPerformThisRequest = require(
    './getIfThisElementIsAllowedToPerformThisRequest'
);


module.exports = Object.freeze( async ({

    redisClient,
    ipAddress,
    queueName,
    maxRate,
    timeRange,

}) => {

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'running runDragonIpAddressInspection'
    );
    
    const hashedIpAddress = (
        crypto.createHash( 'md5' ).update( ipAddress ).digest( 'hex' )
    );

    const powerQueueId = getPowerQueueId({

        queueName,
        hashedElement: hashedIpAddress,
    });

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'adding hashed ip address to queue'
    );

    const operationTimeKey = await doRedisRequest({

        client: redisClient,
        command: 'xadd',
        redisArguments: [
            ipAddressRateLimiterQueueId,
            'MAXLEN',
            '~',
            maxRateLimiterStreamLength,
            '*',
            'powerQueueId',
            powerQueueId
        ],
    });

    const veryPreviousOperationTimeKey = getIncrementedTimeKeyData({

        timeKey: operationTimeKey,
        add: false
    });

    const thePowerOfNow = getOperationTime({ operationTimeKey });

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'hashed ip address added to queue'
    );

    const thisIpAddressIsAllowedToPerformThisRequest = (

        await getIfThisElementIsAllowedToPerformThisRequest({

            elementalQueueId: ipAddressRateLimiterQueueId,
            maxRate,
            timeRange,
            redisClient,
            powerQueueId,
            thePowerOfNow,
            veryPreviousOperationTimeKey
        })
    );

    if( !thisIpAddressIsAllowedToPerformThisRequest ) {

        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
            'This ip address is not allowed to make this request, ' +
            'YOU ARE BANISHED!🐲🔥🔥🔥🔥🔥'
        );

        const error = new Error(
            'Too many requests, please try again later.'
        );

        error.bulltrue = true;
        error.statusCode = dragonErrorStatusCode;

        throw error;
    }

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'runDragonIpAddressInspection successfully executed'
    );
});