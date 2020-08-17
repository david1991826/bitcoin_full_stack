'use strict';

const handleCase = require( './handleCase' );


exports.handler = Object.freeze( async event => {

    console.log( '📩Running handleAuxiliaryEmailCase' );

    try {

        await handleCase({

            event
        });
        
        console.log(            
            '💌☢️🐑handleAuxiliaryEmailCase executed successfully'
        );
    }
    catch( err ) {

        console.log( '📧🦌error in handleAuxiliaryEmailCase:', err );
    }
});
