'use strict';

const {
    doRedisRequest
} = require( '../../redis' );

const {
    getKeyValues,
    constants: {
        END,
        THE_QUEUE_NAME,
        // TIMEOUT
    },
    delay,
} = require( '../localTools' );


const getIfPreviousOperationIsStillRunning = Object.freeze( ({

    data,
    previousOperationId,
    previousOperationQueueId,
    queueId,
    operationId,

}) => {
    
    for( const datum of data ) {

        if(
            (
                datum.keyValues.operationId ===
                previousOperationId
            ) &&
            (
                datum.keyValues.queueId ===
                previousOperationQueueId
            ) &&
            (datum.keyValues.state === END)
        ) {

            console.log(
                `▼queueId: ${ queueId } - ` + 
                `👁operation: ${ operationId } - ` +
                '👁‍🗨previous operation: ' +
                `${ previousOperationId } - ` +
                'waitForPreviousOperationToFinish - ' +
                'previous operation finished before the timeout'
            );

            return false;
        }
    }

    return true;
});


const waitForPreviousOperationToFinish = Object.freeze( async ({

    redisClient,
    whenThePreviousOperationWillBeFinishedForSure,
    queueId,
    firstLastTimeKey,
    operationId,
    previousOperationStartKeyValues

}) => {

    const previousOperationId = previousOperationStartKeyValues.operationId;

    console.log(
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        `👁‍🗨previous operation: ${ previousOperationId } - ` +
        'running waitForPreviousOperationToFinish'
    );

    const timeOfWaitStart = Date.now();

    let previousOperationIsStillRunning = true;

    let lastTimeKey = firstLastTimeKey;

    while( previousOperationIsStillRunning ) {

        const timeUntilPreviousOperationIsFinishedForSure = (

            whenThePreviousOperationWillBeFinishedForSure -
            Date.now()
        );

        if( timeUntilPreviousOperationIsFinishedForSure <= 0 ) {

            console.log(
                `▼queueId: ${ queueId } - ` + 
                `👁operation: ${ operationId } - ` +
                `👁‍🗨previous operation: ${ previousOperationId } - ` +
                'waitForPreviousOperationToFinish - ' +
                'previous operation did not finish before timeout'
            );

            previousOperationIsStillRunning = false;
        }
        else {

            const results = await doRedisRequest({

                client: redisClient,
                command: 'xread',
                redisArguments: [
                    'BLOCK',
                    timeUntilPreviousOperationIsFinishedForSure,
                    'STREAMS',
                    THE_QUEUE_NAME,
                    lastTimeKey
                ]
            });

            console.log(
                `▼queueId: ${ queueId } - ` + 
                `👁operation: ${ operationId } - ` +
                `👁‍🗨previous operation: ${ previousOperationId } - ` +
                'waitForPreviousOperationToFinish got results ' +
                '(or null) after waiting ' +
                `${ (Date.now() - timeOfWaitStart)/1000 } seconds.`
            );

            const rawData = (
        
                !!results &&
                !!results[0] &&
                !!results[0][1] &&
                results[0][1]

            ) || null;

            if( !rawData || (rawData.length < 1) ) {

                console.log(
                    `▼queueId: ${ queueId } - ` + 
                    `👁operation: ${ operationId } - ` +
                    `👁‍🗨previous operation: ${ previousOperationId } - ` +
                    'waitForPreviousOperationToFinish - ' +
                    'previous operation did not finish before timeout'
                );

                previousOperationIsStillRunning = false;
            }
            else {

                const data = rawData.map( entry => {

                    return {
                        timeKey: entry[0],
                        keyValues: getKeyValues({
                            keyValueList: entry[1],
                        }),
                    };
                });

                if(
                    getIfPreviousOperationIsStillRunning({

                        data,
                        previousOperationId,
                        previousOperationQueueId: (
                            previousOperationStartKeyValues.queueId
                        ),
                        queueId,
                        operationId
                    })
                ) {
                    
                    lastTimeKey = data[ data.length - 1 ].timeKey;
                }
                else {

                    previousOperationIsStillRunning = false;
                }
            }
        }
    }

    console.log(
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        `👁‍🗨previous operation: ${ previousOperationId } - ` +
        'waitForPreviousOperationToFinish executed successfully'
    );
});


module.exports = Object.freeze( async ({

    redisClient,
    whenThePreviousOperationWillBeFinishedForSure,
    queueId,
    firstLastTimeKey,
    operationId,
    previousOperationStartKeyValues,
    timeout

}) => {

    console.log(
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        'running waitUntilItIsTime'
    );

    await new Promise( async ( resolve, reject ) => {
        
        let previousOperationHasFinished = false;
        let previousOperationTimedOut = false;
        let errorOccurred = false;

        delay( timeout ).then( () => {

            if( !errorOccurred && !previousOperationHasFinished ) {
                
                previousOperationTimedOut = true;

                const error = new Error(
                    `timeout error: operation: ${ operationId } - ` +
                    `Waiting on queue with id "${ queueId }" - ` +
                    `the timeout of ${ timeout/1000 } ` +
                    `seconds was hit before ` +
                    'this operation could be performed.'
                );
                
                return reject( error );
            }
        });

        try {

            await waitForPreviousOperationToFinish({

                redisClient,
                whenThePreviousOperationWillBeFinishedForSure,
                queueId,
                firstLastTimeKey,
                operationId,
                previousOperationStartKeyValues,
            });

            if( !errorOccurred && !previousOperationTimedOut ) {

                previousOperationHasFinished = true;

                return resolve();
            }
        }
        catch( err ) {

            console.log(
                `▼queueId: ${ queueId } - ` + 
                `👁operation: ${ operationId } - ` +
                `waitUntilItIsTime, error occured: ${ err }`
            );

            if( !previousOperationTimedOut && !previousOperationHasFinished ) {

                errorOccurred = true;

                return reject( err );
            }
        }
    });

    console.log(
        `▼queueId: ${ queueId } - ` + 
        `👁operation: ${ operationId } - ` +
        'waitUntilItIsTime executed successfully'
    );
});
