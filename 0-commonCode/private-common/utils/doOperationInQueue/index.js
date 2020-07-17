'use strict';

const uuidv4 = require( 'uuid/v4' );

const { getClient } = require( '../redis' );

const {
    obliterateOperationFromQueue,
    constants: {
        TIMEOUT,
        OPERATION_TIMEOUT
    }
} = require( './localTools' );

const doOperationInQueueCore = require( './doOperationInQueueCore' );


module.exports = Object.freeze( async ({

    queueId,
    doOperation = () => Promise.resolve(),
    doOperationArgs = [],
    timeout = TIMEOUT,
    operationTimeout = OPERATION_TIMEOUT,

    getCustomBeginningSearchTime = null, // ({ operationTimeKey }) => ...

}) => {

    if( !queueId ) {

        throw new Error( 'error in doOperationInQueue: missing queueId' );
    }

    const operationId = uuidv4();

    const redisClient = getClient();

    console.log( '🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒' );
    console.log( `🐴Running do Operation "${ operationId }" in Queue🐴` );
    console.log( '🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒' );

    try {

        const doOperationInQueueCoreResults = await doOperationInQueueCore({

            redisClient,
            operationId,
            doOperation,
            doOperationArgs,
            queueId,
            timeout,
            operationTimeout,

            getCustomBeginningSearchTime
        });

        redisClient.quit();

        console.log( '🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓' );
        console.log(
            `🦄Do Operation "${ operationId }" ` +
            `in Queue Executed Successfully🦄`
        );
        console.log( '🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓🔓' );

        return doOperationInQueueCoreResults;
    }
    catch( err ) {

        console.log( '🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀' );
        console.log(
            '🐺error in doOperationInQueue🐺:',
            `err: ${ err } - \n`,
            `operationId: "${ operationId }"`
        );
        console.log( '🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀🦀' );
        console.log(
            'obliterating operation from queue ' +
            'and destorying the client before finally throwing the error'
        );

        try {

            await obliterateOperationFromQueue({
                redisClient,
                queueId,
                operationId,
                errorMessage: err.message || 'doOperationError'
            });
        }
        catch( obliterateOperationFromQueueErr ) {

            console.log(
                '🦆really weird error, error in obliterating operation ' +
                `"${ operationId }" from queue after other ` +
                `error ${ err } occurred, here is the obliteration error: ` +
                obliterateOperationFromQueueErr
            );
        }
     
        redisClient.quit();

        throw err;
    }
});