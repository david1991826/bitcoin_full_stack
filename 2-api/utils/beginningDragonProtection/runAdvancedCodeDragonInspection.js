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
} = require( '@bitcoin-api/full-stack-api' );

const {
    utils: {
        getPowerQueueId
    },
    constants: {
        advancedCodeRateLimiterQueueId,
        dragonErrorStatusCode,
        maxRateLimiterStreamLength
    }
} = require( './localTools' );

const getIfThisElementIsAllowedToPerformThisRequest = require(
    './getIfThisElementIsAllowedToPerformThisRequest'
);

const getAdvancedCode = Object.freeze(
    
    megaCode => (

        megaCode.substring( 124, 254 ) + 
        megaCode.substring( 11, 19 ) +
        megaCode.substring( 22, 55 )
    )
);


module.exports = Object.freeze( async ({

    redisClient,
    megaCode,
    queueName,

    maxRate,
    timeRange,

}) => {

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'running runAdvancedCodeDragonInspection'
    );

    const advancedCode = getAdvancedCode( megaCode );

    const hashedAdvancedCode = (
        crypto
            .createHash( 'md5' )
            .update( advancedCode )
            .digest( 'hex' )
    );

    const powerQueueId = getPowerQueueId({

        queueName,
        hashedElement: hashedAdvancedCode,
    });

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'adding hashed advanced code to queue'
    );

    const operationTimeKey = await doRedisRequest({

        client: redisClient,
        command: 'xadd',
        redisArguments: [
            advancedCodeRateLimiterQueueId,
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
        'hashed advanced code added to queue'
    );

    const thisAdvancedCodeIsAllowedToPerformThisRequest = (

        await getIfThisElementIsAllowedToPerformThisRequest({

            elementalQueueId: advancedCodeRateLimiterQueueId,
            maxRate,
            timeRange,
            redisClient,
            powerQueueId,
            thePowerOfNow,
            veryPreviousOperationTimeKey
        })
    );

    if( !thisAdvancedCodeIsAllowedToPerformThisRequest ) {

        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
            'This advanced code is not allowed to make this request, ' +
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
        'runAdvancedCodeDragonInspection successfully executed'
    );
});
