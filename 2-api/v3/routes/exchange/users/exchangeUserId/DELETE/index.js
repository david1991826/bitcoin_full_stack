'use strict';

const {

    getResponse,
    handleError,
    // beginningDragonProtection,
    stringify,

} = require( '../../../../../utils' );

const {
    aws: {
        lambda: {
            getExchangeEvent
        }
    },
    loginTokens: {
        mongolianBeginningDragonProtection
    }
} = require( '../../../../../exchangeUtils' );

const deleteUser = require( './deleteUser' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log(
            'running the exchange /users/exchangeUserId - DELETE function'
        );

        const event = getExchangeEvent({

            rawEvent,
            shouldGetBodyFromEvent: false,
            shouldGetPathParametersFromEvent: true,
        });

        const pathExchangeUserId = event.pathParameters.exchangeUserId;

        const {
            
            exchangeUserId,
            ipAddress,
            loginTokens,

        } = await mongolianBeginningDragonProtection({

            queueName: 'exchangeDeleteUser',
            event,
            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
            shouldGetFullLoginTokenInfo: true,
            shouldOnlyGetInitialTokens: false,
        });

        if( exchangeUserId !== pathExchangeUserId ) {

            const error = new Error( 'invalid userId' );
            error.bulltrue = true;
            error.statusCode = 400;
            throw error;
        }

        const deleteUserResults = await deleteUser({

            exchangeUserId,
            ipAddress,
            loginTokens,
        });

        const responseData = Object.assign(
            {},
            deleteUserResults
        );

        console.log(
            
            'the exchange /users/exchangeUserId ' +
            '- DELETE function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log(
            
            'error in exchange /users/exchangeUserId ' +
            `- DELETE function: ${ err }`
        );

        return handleError( err );
    }
});