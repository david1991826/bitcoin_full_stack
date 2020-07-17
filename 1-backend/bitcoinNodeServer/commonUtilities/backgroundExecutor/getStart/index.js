'use strict';

const doOperationAsap = require( './doOperationAsap' );


module.exports = ({ eventEmitter }) => () => {

    console.log(
        'starting background function sequential executor'
    );

    eventEmitter.on( 'addOperation', ({ operation, operationArguments }) => {

        console.log(
            'background function sequential executor event'
        );

        doOperationAsap({
            operation,
            operationArguments
        });
    });
};