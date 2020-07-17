'use strict';

const { errorCodes } = require( '../../../constants' );
const { doRedisRequest } = require( '../../redis' );

const {
    getKeyValues,
    constants: {
        START,
        END,
    },
    getRedisXAddArguments,
    obliterateOperationFromQueue,
    getOperationTime,
    delay,
    xRangeWithPagination,
    getIncrementedTimeKeyData
} = require( '../localTools' );

const waitUntilItIsTime = require( './waitUntilItIsTime' );


const getPreviousOperationStartKeyValuesAndInfo = Object.freeze( ({

    // operationStartOrder,
    currentOperations

}) => {
                
    for(
        let i = (currentOperations.length - 1);
        i >= 0;
        i--
    ) {

        const {
        
            timeKey,
            keyValues

        } = currentOperations[i];

        if( keyValues.state === START ) {

            return {
             
                previousOperationStartTimeKey: timeKey,
                previousOperationStartOrder: i,
                previousOperationStartKeyValues: keyValues
            };
        }
    }

    return {

        previousOperationStartTimeKey: null,
        previousOperationStartOrder: null,
        previousOperationStartKeyValues: null
    };
});


const getPreviousOperationEndKeyValuesAndInfo = Object.freeze( ({

    // operationStartOrder,
    previousOperationStartOrder,
    currentOperations,
    previousOperationStartKeyValues
    
}) => {

    for(
        let i = (currentOperations.length - 1);
        i > previousOperationStartOrder;
        i--
    ) {

        const {
    
            // timeKey,
            keyValues

        } = currentOperations[i];

        if(
            (
                keyValues.operationId ===
                previousOperationStartKeyValues.operationId
            ) &&
            // ( // implied
            //     keyValues.queueId ===
            //     previousOperationStartKeyValues.queueId
            // ) &&
            (keyValues.state === END)
        ) {

            return {
            
                previousOperationEndKeyValues: keyValues
            };
        }
    }

    return {

        previousOperationEndKeyValues: null
    };
});


module.exports = Object.freeze( async ({

    redisClient,
    operationId,
    queueId,
    doOperation,
    doOperationArgs,
    timeout,
    operationTimeout,

    getCustomBeginningSearchTime
    
}) => {

    console.log(
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        `running doOperationInQueueCore for operation: "${ operationId }"`
    );

    const operationTimeKey = await doRedisRequest({

        client: redisClient,
        command: 'xadd',
        redisArguments: getRedisXAddArguments({

            queueId,
            operationId,
            state: START,
            timeout,
            operationTimeout,
            // magnaQueue
        }),
    });

    const operationTime = getOperationTime({ operationTimeKey });

    console.log( 
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        `time data: ${ JSON.stringify({

            operationTimeKey,
            timeout,
            operationTimeout,

        }, null, 4 )}`
    );

    const startTime = (
        
        !!getCustomBeginningSearchTime ? getCustomBeginningSearchTime({

            operationTimeKey,
            
        }) : (

            operationTime - (timeout + operationTimeout + 100)
        )
    );

    const currentOperations = (
        
        await xRangeWithPagination({

            redisClient,
            startTime,
            endTime: getIncrementedTimeKeyData({
                
                timeKey: operationTimeKey,
                add: false
            })
        })

    ).map( rawCurrentOperation => {

        const timeKey = rawCurrentOperation[0];

        const currentOperation = {
            timeKey,
            keyValues: getKeyValues({
                keyValueList: rawCurrentOperation[1],
            })
        };

        if( currentOperation.keyValues.queueId === queueId ) {

            return currentOperation;
        }
        else {

            return null;
        }
        
    }).filter( currentOperation => !!currentOperation );

    const {

        previousOperationStartTimeKey,
        previousOperationStartOrder,
        previousOperationStartKeyValues

    } = getPreviousOperationStartKeyValuesAndInfo({

        // operationStartOrder,
        currentOperations
    });

    if( !!previousOperationStartKeyValues ) {

        const {

            previousOperationEndKeyValues

        } = getPreviousOperationEndKeyValuesAndInfo({

            // operationStartOrder,
            previousOperationStartOrder,
            currentOperations,
            previousOperationStartKeyValues
        });

        if( !previousOperationEndKeyValues ) {

            const whenThePreviousOperationWillBeFinishedForSure = (
                getOperationTime({
                    operationTimeKey: previousOperationStartTimeKey,
                }) + 
                previousOperationStartKeyValues.timeout +
                previousOperationStartKeyValues.operationTimeout +
                20
            );

            if( Date.now() < whenThePreviousOperationWillBeFinishedForSure ) {

                await waitUntilItIsTime({

                    redisClient,
                    whenThePreviousOperationWillBeFinishedForSure,
                    queueId,
                    firstLastTimeKey: operationTimeKey,
                    operationId,
                    previousOperationStartKeyValues,
                    timeout
                });
            }
        }
    }

    console.log(
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        'doing operation'
    );

    const doOperationResults = await new Promise( async (

        resolve,
        reject

    ) => {
        
        let operationHasFinished = false
        let operationTimedOut = false
        let errorOccurred = false;

        delay( operationTimeout ).then( () => {

            if( !errorOccurred && !operationHasFinished ) {

                operationTimedOut = true;

                const error = new Error(
                    errorCodes.operationTimeOutError + 
                    ` - timeout error: Operation "${ operationId }" ` +
                    `on queue with id "${ queueId }" ` +
                    'did not finish on time⏰. ' +
                    `The timeout of ${ operationTimeout/1000 } ` +
                    `seconds was hit WHILE ` +
                    'this operation was being performed🧐. '
                );

                return reject( error );
            }
        });

        try {

            const doOperationResults = await doOperation( ...doOperationArgs );

            if( !errorOccurred && !operationTimedOut ) {
    
                operationHasFinished = true;
    
                return resolve( doOperationResults );
            }
        }
        catch( err ) {

            console.log(
                `▼queueId: ${ queueId } - ` + 
                `👁operation: ${ operationId } - ` +
                `error occured in doing operation: ${ err }`
            );

            if( !operationTimedOut && !operationHasFinished ) {

                errorOccurred = true;

                return reject( err );
            }
        }
    });

    await obliterateOperationFromQueue({
        redisClient,
        queueId,
        operationId,
    });

    console.log(
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        'doOperationInQueueCore executed successfully, ' +
        'here are the doOperationResults: ' +
        JSON.stringify( doOperationResults, null, 4 )
    );

    return doOperationResults;
});