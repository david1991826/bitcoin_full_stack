'use strict';

const drq = require( 'drq' );


module.exports = Object.freeze( async ({

    queueId,
    doOperation,
    doOperationArgs,
    timeout,
    operationTimeout,
    getCustomBeginningSearchTime, // ({ operationTimeKey }) => ...

}) => {

    return drq({

        queueId,
        operation: doOperation,
        operationArgs: doOperationArgs,
        timeout,
        operationTimeout,
        getCustomBeginningSearchTime, // ({ operationTimeKey }) => ...
    });
});