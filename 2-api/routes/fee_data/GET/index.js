'use strict';

const {
    
    getFormattedEvent,
    getResponse,
    handleError,
    beginningDragonProtection,
    
} = require( '../../../utils' );

const getFeeData = require( './getFeeData' );

const fiveMiniutes = 5 * 60 * 1000;


exports.handler = Object.freeze( async rawEvent => {
    
    console.log( 'running the /fee_data - GET function' );

    try {

        const event = getFormattedEvent({

            rawEvent
        });

        await beginningDragonProtection({

            queueName: 'getFeeData',
            
            event,
            megaCodeIsRequired: false,
            
            ipAddressMaxRate: 20,
            ipAddressTimeRange: fiveMiniutes,
        });

        const feeData = await getFeeData();

        console.log(
        
            '/fee_data - GET function executed successfully, ' +
            'returning values: ' +
            JSON.stringify( feeData, null, 4 )
        );

        return getResponse({ body: feeData });
    }
    catch( err ) {

        console.log( `error in /fee_data - GET function: ${ err }` );

        return handleError( err );
    }
});