'use strict';

const {
    doRedisRequest,
    streams,
} = require( '../redis' );

const {
    redis: {
        streamIds: {
            q
        }
    }
} = require( '../../constants' );

const TIMEOUT = 10 * 1000;
const OPERATION_TIMEOUT = 20 * 1000;
const START = 'start';
const END = 'end';
const THE_QUEUE_NAME = q;
const PAGINATION_COUNT = 100;
const MAX_STREAM_LENGTH = 300000;


const getOperationTime = streams.getOperationTime;
// const getOperationTimeKey = streams.getOperationTimeKey;
const getIncrementedTimeKeyData = streams.getIncrementedTimeKeyData;

const xRangeWithPagination = Object.freeze( async ({

    redisClient,
    startTime,
    endTime,

}) => {

    return await streams.xRangeWithPagination({

        redisClient,
        startTime,
        endTime,

        queueName: THE_QUEUE_NAME,
        paginationCount: PAGINATION_COUNT
    });
});


const getKeyValues = Object.freeze(
    
    ({ keyValueList }) => streams.getKeyValues({

        keyValueList,
        numberKeys: [ 'timeout', 'operationTimeout' ],
    })
);


const getRedisXAddArguments = Object.freeze( ({
    
    queueId,
    operationId,
    state,
    timeout,
    operationTimeout,
    errorMessage,

}) => {
    
    const xAddArguments = [
        THE_QUEUE_NAME,
        'MAXLEN',
        '~',
        MAX_STREAM_LENGTH,
        '*',
        'queueId',
        queueId,
        'operationId',
        operationId,
        'state',
        state
    ];

    if( !!timeout ) {

        xAddArguments.push( 'timeout', timeout );
    }

    if( !!operationTimeout ) {

        xAddArguments.push( 'operationTimeout', operationTimeout );
    }

    if( !!errorMessage ) {

        xAddArguments.push( 'errorMessage', errorMessage.substring( 500 ) );
    }

    return xAddArguments;
});


const obliterateOperationFromQueue = Object.freeze( async ({

    queueId,
    operationId,
    redisClient,
    errorMessage

}) => {

    console.log(
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        `running obliterateOperationFromQueue - ${ JSON.stringify({
                errorMessage
            }, null, 4 )
        }`
    );

    const thisRequestTimeKey = await doRedisRequest({

        client: redisClient,
        command: 'xadd',
        redisArguments: getRedisXAddArguments({

            queueId,
            operationId,
            state: END,
            errorMessage
        }),
    });

    console.log(
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        `obliterateOperationFromQueue success`
    );

    return thisRequestTimeKey;
});

const delay = Object.freeze(
    timeout => new Promise( resolve => setTimeout( resolve, timeout ) )
);
 
module.exports = Object.freeze({

    getKeyValues,
    getRedisXAddArguments,
    obliterateOperationFromQueue,
    getOperationTime,
    delay,
    xRangeWithPagination,
    getIncrementedTimeKeyData,

    constants: Object.freeze({

        START,
        END,
        THE_QUEUE_NAME,
        TIMEOUT,
        OPERATION_TIMEOUT
    }),
});