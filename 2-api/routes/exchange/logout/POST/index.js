'use strict';

const {

    getFormattedEvent,
    getResponse,
    handleError,
    stringify,

} = require( '../../../../utils' );

const {
    loginTokens: {
        mongolianBeginningDragonProtection
    },
} = require( '../../../../exchangeUtils' );

const deleteLogins = require( './deleteLogins' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /logout - POST function' );

        const event = getFormattedEvent({

            rawEvent,
            shouldGetBodyFromEvent: false,
        });

        const {
            
            ipAddress,
            exchangeUserId,
            // loginTokenId,
            loginTokens,
            hashedLoginTokenIdFromRequestHeader

        } = await mongolianBeginningDragonProtection({

            event,
            queueName: 'exchangeLogoutPost',
            ipAddressMaxRate: 20,
            ipAddressTimeRange: 60000,
            shouldGetFullLoginTokenInfo: true,
        });

        const signedInLoginTokens = loginTokens.filter(
            ({ signedOut = false }) => !signedOut
        );

        const deleteLoginResults = await deleteLogins({

            exchangeUserId,
            hashedLoginTokenIdFromRequestHeader,
            ipAddress,
            signedInLoginTokens,
        });

        const responseData = Object.assign(
            {},
            deleteLoginResults
        );

        console.log(
            
            'the exchange /logout - POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log( `error in exchange /logout - POST function: ${ err }` );

        return handleError( err );
    }
});