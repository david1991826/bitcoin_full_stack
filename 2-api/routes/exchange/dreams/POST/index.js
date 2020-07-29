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

const performEnchantedLuckFunction = require( './performEnchantedLuckFunction' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /dreams - POST function' );

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
            queueName: 'exchangeEnchantedDreams',
            event,
            megaCodeIsRequired: false,
            ipAddressMaxRate: 120,
            ipAddressTimeRange: 60000,
        });

        const enchantedLuck = await performEnchantedLuckFunction({

            exchangeUserId,
            event,
            ipAddress,
        });

        const responseData = Object.assign(
            {},
            enchantedLuck
        );

        console.log(
            
            'the exchange /dreams - ' +
            'POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            'error in exchange /dreams ' +
            `- POST function: ${ err }`
        );

        return handleError( err );
    }
});