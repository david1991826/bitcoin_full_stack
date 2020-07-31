'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    // beginningDragonProtection,
    stringify,

} = require( '../../../../../utils' );

const {
    loginTokens: {
        mongolianBeginningDragonProtection
    }
} = require( '../../../../../exchangeUtils' );

const getUser = require( './getUser' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /users/exchangeUserId - GET function'
        );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetBodyFromEvent: false,
            shouldGetPathParametersFromEvent: true,
        });

        const pathExchangeUserId = event.pathParameters.exchangeUserId;

        const {
            
            exchangeUserId

        } = await mongolianBeginningDragonProtection({

            queueName: 'exchangeGetUser',
            event,
            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
        });

        if( exchangeUserId !== pathExchangeUserId ) {

            const error = new Error( 'invalid userId' );
            error.bulltrue = true;
            error.statusCode = 400;
            throw error;
        }

        const getUserResults = await getUser({

            event,
            exchangeUserId
        });

        const responseData = Object.assign(
            {},
            getUserResults
        );

        console.log(
            
            'the exchange /users/exchangeUserId ' +
            '- GET function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            
            'error in exchange /users/exchangeUserId ' +
            `- GET function: ${ err }`
        );

        return handleError( err );
    }
});