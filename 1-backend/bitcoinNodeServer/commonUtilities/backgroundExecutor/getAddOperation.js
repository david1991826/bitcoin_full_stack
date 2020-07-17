'use strict';


module.exports = ({ eventEmitter }) => ({

    operation,
    operationArguments = []

}) => {

    eventEmitter.emit( 'addOperation', { operation, operationArguments } );
};