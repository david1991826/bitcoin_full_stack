'use strict';

const {

    getResponse,
    handleError,
    beginningDragonProtection,
    stringify,

} = require( '../../../../utils' );

const {
    aws: {
        lambda: {
            getExchangeEvent
        }
    }
} = require( '../../../../exchangeUtils' );

const addNewUser = require( './addNewUser' );


exports.handler = Object.freeze( async rawEvent => {
    
    try {

        console.log( 'running the exchange /users - POST function' );

        const event = getExchangeEvent({

            rawEvent,
            shouldGetBodyFromEvent: true,
        });

        const {
            
            ipAddress

        } = await beginningDragonProtection({

            queueName: 'exchangeAddNewUser',
            
            event,

            megaCodeIsRequired: false,

            ipAddressMaxRate: 2,
            ipAddressTimeRange: 60000,
        });

        // const userObject = 
        await addNewUser({

            event,
            ipAddress
        });

        const responseData = Object.assign(
            {},
            {
                userAddedSuccessfully: true
            }
        );

        console.log(
            
            'the exchange /users - POST function executed successfully: ' +
            stringify({ responseData })
        );

        return getResponse({

            body: responseData
        });
    }
    catch( err ) {

        console.log( `error in exchange /users - POST function: ${ err }` );

        return handleError( err );
    }
});