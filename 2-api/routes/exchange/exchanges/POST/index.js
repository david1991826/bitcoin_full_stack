'use strict';

const {

    getResponse,
    handleError,
    // beginningDragonProtection,
    stringify,

} = require( '../../../../utils' );

const {
    aws: {
        lambda: {
            getExchangeEvent
        }
    },
    loginTokens: {
        mongolianBeginningDragonProtection
    }
} = require( '../../../../exchangeUtils' );

const doExchange = require( './doExchange' );



exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /exchanges - POST function' );

        const event = getExchangeEvent({

            rawEvent,
            shouldGetBodyFromEvent: true,
        });
        
        const {
            
            exchangeUserId,
            // ipAddress

        } = await mongolianBeginningDragonProtection({

            queueName: 'exchangeDoExchange',
            event,
            megaCodeIsRequired: false,
            ipAddressMaxRate: 10,
            ipAddressTimeRange: 60000,
        });

        const doExchangeResponse = await doExchange({

            event,
            exchangeUserId,
        });

        const responseData = Object.assign(

            {},
            doExchangeResponse
        );

        console.log(
            
            'the exchange /exchanges - ' +
            'POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /exchanges ' +
            `- POST function: ${ err }`
        );

        return handleError( err );
    }
});