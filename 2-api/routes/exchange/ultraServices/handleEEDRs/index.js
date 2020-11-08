'use strict';

const handleCase = require( './handleCase' );


exports.handler = Object.freeze( async event => {

    console.log( '📩Running handleEEDRs' );

    try {

        await handleCase({

            event,
        });
        
        console.log(            
            '💌☢️🐑handleEEDRs executed successfully'
        );
    }
    catch( err ) {

        console.log( '📧🦌error in handleEEDRs:', err );
    }
});
