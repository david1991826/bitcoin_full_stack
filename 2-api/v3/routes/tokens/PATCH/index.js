'use strict';

const {
    beginningDragonProtection,
    handleError,
    getResponse
} = require( '../../../utils' );

const updateUser = require( './updateUser' );


exports.handler = Object.freeze( async event => {
    
    console.log( 'running /tokens - PATCH function' );

    try {

        const {
            
            ipAddress,
            user
            
        } = await beginningDragonProtection({

            queueName: 'updateUser',
            event,
        });

        const results = await updateUser({

            event,
            user,
            ipAddress,
        });

        console.log( '/tokens - PATCH function executed successfully' );

        const response = getResponse({

            body: results
        });
        
        return response;
    }
    catch( err ) {

        console.log( 'error in /tokens - PATCH function', err );

        return handleError( err );
    }
});