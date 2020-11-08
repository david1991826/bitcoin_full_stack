'use strict';

const {
    getFormattedEvent,
    beginningDragonProtection,
    handleError,
    getResponse,
} = require( '../../../utils' );

const doLogin = require( './doLogin' );

const twoHours = 2 * 60 * 60 * 1000;


exports.handler = Object.freeze( async rawEvent => {
    
    console.log( 'running /tokens - POST function' );

    try {

        const event = getFormattedEvent({

            rawEvent,
        });

        const {
            
            ipAddress
            
        } = await beginningDragonProtection({

            queueName: 'post_tokens',
            
            event,
            ipAddressMaxRate: 2,
            ipAddressTimeRange: twoHours,
            
            megaCodeIsRequired: false,
        });

        const doLoginResults = await doLogin({

            ipAddress
        });

        console.log( '/tokens - POST function executed successfully' );

        const response = getResponse({

            body: doLoginResults
        });
        
        return response;
    }
    catch( err ) {

        console.log( 'error in /tokens - POST function', err );

        return handleError( err );
    }
});