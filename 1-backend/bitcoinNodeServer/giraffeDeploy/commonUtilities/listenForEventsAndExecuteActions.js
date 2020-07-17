'use strict';

const {

    

    utils: {
        redis: {
            rhinoCombos: {
                giraffeAndTreeStatusUpdate
            },
            doRedisFunction,
            getClient,
            doRedisRequest,
            streams: {
                getKeyValues,
                getOperationTime,
                getIncrementedTimeKeyData
            }
        },
        javascript: {
            jsonEncoder
        },
        stringify
    },

} = require( '@npm.m.stecky.efantis/commonprivate' );

const getTimeInfo = require( './getTimeInfo' );

const {

    eventNames,
    // publishSubscribeChannels,
    // errorListenerMessages,
    streamIds

} = require( './constants' );

const theNameOfTheFinalEvent = eventNames.leaf.serviceIsGood;

const handleError = Object.freeze( async ({

    err,
    isGiraffe,
    otherData

}) => {

    console.log(
        'listenForEventsAndExecuteActionsCore.handleError - ' +
        'running handleError with the following values: ' +
        stringify({
            err,
            isGiraffe,
            otherData
        })
    );

    const redisClient = getClient();

    try {

        await giraffeAndTreeStatusUpdate({

            redisClient,
            eventName: eventNames.common.error,
            information: {

                errorMessage: (
                    err.message || 'listenForEventsAndExecuteActions error'
                ),
                isGiraffe: (isGiraffe === '🦒'),
                otherData
            }
        });

        redisClient.quit();

        console.log(
            (
                'listenForEventsAndExecuteActionsCore.handleError -' 
            ),
            err
        );
    }
    catch( innerErr ) {

        redisClient.quit();

        console.log(
            'listenForEventsAndExecuteActionsCore - ' +
            'error with the following values: ' +
            stringify({
                err,
                isGiraffe,
                otherData
            })
        );
    }
});


const listenForEventsAndExecuteActionsCore = Object.freeze( async ({

    operationStartTimeKey = `${ Date.now() }-0`,
    deployId,
    isGiraffe = '🦒',
    redisClient,
    operationExpiry,
    performActionBasedOnDeployEvent,
    doPostInitializationAction = null,

}) => {

    const operationExpiryTimeString = (
        new Date( operationExpiry )
    ).toTimeString();

    console.log(
        '🤠',
        'running listenForEventsAndExecuteActions with the following values:',
        stringify({

            deployId,
            isGiraffe,
            operationStartTimeKey,
            currentTime: ( new Date() ).toTimeString(),
            operationExpiry: operationExpiryTimeString,
        }),
        '🤠'
    );

    let { timeUntilExpiry, thereIsTimeBeforeExpiry } = getTimeInfo({
        operationExpiry
    });
    let theFinalActionHasNotBeenPerformedYet = true;
    let listenStartTimeKey = operationStartTimeKey;
    let thePostInitializationActionHasStarted = false;
    let currentEventOrderNumber = 0;

    while(
        thereIsTimeBeforeExpiry &&
        theFinalActionHasNotBeenPerformedYet
    ) {

        console.log(
            'listenForEventsAndExecuteActions - listening for events:',
            stringify({
                ['seconds until expiry']: timeUntilExpiry/1000,
                ['listen start time']: (
                    new Date( getOperationTime({
                        operationTimeKey: listenStartTimeKey,
                    }) )
                ).toTimeString(),
                ['operation expiry time']: operationExpiryTimeString
            })
        );

        const [ deployEventRawDataResults ] = await Promise.all([
            
            doRedisRequest({

                client: redisClient,
                command: 'xread',
                redisArguments: [
                    'BLOCK',
                    timeUntilExpiry,
                    'STREAMS',
                    streamIds.zarbonDeploy,
                    listenStartTimeKey
                ],
            }),

            (async () => {

                if(
                    !!doPostInitializationAction &&
                    !thePostInitializationActionHasStarted
                ) {

                    thePostInitializationActionHasStarted = true;
                    
                    try {
                        console.log(
                            'listenForEventsAndExecuteActions - ' +
                            'running doPostInitializationAction' 
                        );

                        await doPostInitializationAction();

                        console.log(
                            'listenForEventsAndExecuteActions - ' +
                            'doPostInitializationAction executed ' +
                            'successfully'
                        );
                    }
                    catch( err ) {

                        console.log(
                            'listenForEventsAndExecuteActions -',
                            'error in doPostInitializationAction:',
                            err ,
                            'handling error'
                        );

                        await handleError({

                            err,
                            isGiraffe,
                            otherData: {

                                errorInfo: 'doPostInitializationAction error',
                                errorMessage: err.message
                            }
                        });

                        return;
                    }
                }
            })()
        ]);

        const deployEventRawData = (
    
            !!deployEventRawDataResults &&
            !!deployEventRawDataResults[0] &&
            !!deployEventRawDataResults[0][1] &&
            deployEventRawDataResults[0][1]

        ) || [];

        const deployEventData = deployEventRawData.map( entry => {

            return {
                timeKey: entry[0],
                keyValues: getKeyValues({
                    keyValueList: entry[1],
                }),
            };
        });

        console.log(
            'listenForEventsAndExecuteActions - got deploy event data:',
            stringify({
                deployEventDataLength: deployEventData.length 
            })
        );

        for( const deployEventDatum of deployEventData ) {

            const {
                // timeKey,
                keyValues,
            } = deployEventDatum;

            const eventName = keyValues.eventName;

            const information = jsonEncoder.decodeJson(
                keyValues.information
            );

            try {

                console.log(
                    (
                        'listenForEventsAndExecuteActions - ' +
                        'performing action based on the following data:'
                    ),
                    stringify({
                        isGiraffe,
                        eventName,
                        information
                    })
                );

                if( eventName === eventNames.common.error ) {

                    const results = {

                        anErrorOccurred: true
                    };

                    console.log(
                      
                        'listenForEventsAndExecuteActions - ' + 
                        'executed successfully (not >=100% like 🦍🐒vs🐊) ' +
                        'is error event - returning results ' +
                        `${ stringify( results ) }`
                    );

                    return results;
                }

                const eventHasInvalidDeployId = (
                  
                    information.deployId !== deployId
                );

                const eventIsNotInTheExpectedOrder =(

                    information.eventOrder !== (currentEventOrderNumber + 1)
                );

                if(
                    eventHasInvalidDeployId ||
                    eventIsNotInTheExpectedOrder
                ) {

                    console.log( `unexpected event: ${
                        JSON.stringify({
                            
                            information,
                            eventHasInvalidDeployId,
                            eventIsNotInTheExpectedOrder
                        })
                    }` );

                    const results = {

                        anErrorOccurred: true,
                    };
                
                    console.log(
                        '🤠listenForEventsAndExecuteActions - ' +
                        'executed successfully - is error event🐊🤠 - ' +
                        'returning results - ' +
                        stringify( results )
                    );
                
                    return results;
                }

                currentEventOrderNumber++;

                await performActionBasedOnDeployEvent({

                    isGiraffe,
                    eventName,
                    information
                });
            }
            catch( err ) {

                console.log(
                    'listenForEventsAndExecuteActions -',
                    'an error occurred:',
                    err,
                    'handling error'
                );

                await handleError({

                    err,
                    isGiraffe,
                    otherData: {
                        eventName,
                        information
                    },
                });

                const results = {

                    anErrorOccurred: true,
                };

                console.log(
                    '🤠listenForEventsAndExecuteActions - ' +
                    'executed successfully ' +
                    '(an error occurred in processing an event🐊) - ' +
                    `returning results - ${ stringify( results ) }`
                );

                return results;
            }

            if( eventName === theNameOfTheFinalEvent ) {
                
                console.log(
                    (
                        'listenForEventsAndExecuteActions - ' +
                        'the final event has occurred ' +
                        'breaking the cycle of karma'
                    ),
                    eventName
                );

                theFinalActionHasNotBeenPerformedYet = false;
            }
        }

        if( deployEventData.length < 1 ) {

            console.log(
                'listenForEventsAndExecuteActions - ' +
                'hit timeout!⏰'
            );

            throw new Error(
                'listenForEventsAndExecuteActions: operation timed out'
            );
        }
        else if( theFinalActionHasNotBeenPerformedYet ) {

            listenStartTimeKey = getIncrementedTimeKeyData({

                timeKey: deployEventData[
                    
                    deployEventData.length - 1

                ].timeKey
            });

            const timeInfo = getTimeInfo({
                operationExpiry
            });

            console.log(
                'listenForEventsAndExecuteActions - ' +
                'processed events - will listen for more - ' +
                stringify({

                    listenStartTimeKey,
                    timeInfo
                })
            );

            timeUntilExpiry = timeInfo.timeUntilExpiry;
            thereIsTimeBeforeExpiry = timeInfo.thereIsTimeBeforeExpiry;
        }
        else {

            console.log(
                'listenForEventsAndExecuteActions - ' +
                'finished processing events - will not listen for more'
            );
        }
    }

    const results = {

        anErrorOccurred: false,
    };

    console.log(
        '🤠listenForEventsAndExecuteActions - ' +
        'executed successfully🤠 - ' +
        'returning results - ' +
        stringify( results )
    );

    return results;
});


module.exports = Object.freeze( async ({

    deployId,
    isGiraffe,
    operationExpiry,
    performActionBasedOnDeployEvent,
    doPostInitializationAction,
    
}) => {

    const results = await doRedisFunction({

        performFunction: async ({

            redisClient

        }) => {

            return await listenForEventsAndExecuteActionsCore({

                deployId,
                isGiraffe,
                redisClient,
                operationExpiry,
                performActionBasedOnDeployEvent,
                doPostInitializationAction,
            });
        },

        functionName: 'listenForEventsAndExecuteActionsCore'
    });
    

    return results;
});
