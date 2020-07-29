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

const doWithdraw = require( './doWithdraw' );



exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /withdraws - POST function' );

        const event = getExchangeEvent({

            rawEvent,
            shouldGetBodyFromEvent: true,
        });

        // const exchangeUserId = event.body.userId;
        
        const {
            
            exchangeUserId,
            ipAddress

        } = await mongolianBeginningDragonProtection({

            // exchangeUserId,
            queueName: 'exchangeDoWithdraw',
            event,
            megaCodeIsRequired: false,
            ipAddressMaxRate: 10,
            ipAddressTimeRange: 60000,
        });

        const doWithdrawResponse = await doWithdraw({

            exchangeUserId,
            event,
            ipAddress,
        });

        const responseData = Object.assign(

            {},
            doWithdrawResponse
        );

        console.log(
            
            'the exchange /withdraws - ' +
            'POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /withdraws ' +
            `- POST function: ${ err }`
        );

        return handleError( err );
    }
});