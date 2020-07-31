'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    beginningDragonProtection,
    stringify,

} = require( '../../../../utils' );

const verifyUser = require( './verifyUser' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /verify-user - POST function' );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetBodyFromEvent: true,
        });

        const {
            
            ipAddress

        } = await beginningDragonProtection({

            queueName: 'exchangeVerifyUser',
            
            event,

            megaCodeIsRequired: false,

            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
        });

        const verifyUserResponse = await verifyUser({

            event,
            ipAddress,
        });

        const responseData = Object.assign(

            {},
            verifyUserResponse
        );

        console.log(
            
            'the exchange /verify-user - ' +
            'POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /verify-user ' +
            `- POST function: ${ err }`
        );

        return handleError( err );
    }
});