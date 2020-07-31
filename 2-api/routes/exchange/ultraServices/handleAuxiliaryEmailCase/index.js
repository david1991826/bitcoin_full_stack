'use strict';


exports.handler = Object.freeze( async event => {

    console.log( '📩Running handleAuxiliaryEmailCase' );

    try {

        console.log(`
        
        
            TEMPORARY LOG: ${ JSON.stringify( {

                event

            }, null, 4 ) }
        
        
        `);
        
        console.log(            
            '💌☢️🐑handleAuxiliaryEmailCase executed successfully'
        );
    }
    catch( err ) {

        console.log( '📧🦌error in handleAuxiliaryEmailCase:', err );
    }
});
