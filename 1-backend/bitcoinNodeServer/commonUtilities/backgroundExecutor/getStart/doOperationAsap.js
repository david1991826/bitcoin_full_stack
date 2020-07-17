'use strict';

let currentOperation = Promise.resolve();


module.exports = ({
    
    operation,
    operationArguments

}) => {

    console.log(
        'running background operation doOperation'
    );

    currentOperation = currentOperation.then( () => {

        console.log( 'performing background operation' );
        
        return operation( ...operationArguments ).then( () => {

            console.log(
                
                'background operation doOperation ' +
                'executed successfully'
            );

        }, err => {

            console.log(
                
                `error in performing background operation: ${ err }`
            ); 
        });
    });
};
