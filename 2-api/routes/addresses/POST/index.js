'use strict';

const getOrAssignAddressData = require( './getOrAssignAddressDatum' );

const runWalhallaAddressMode = require( './runWalhallaAddressMode' );

const {
    
    beginningDragonProtection,
    getResponse,
    handleError,
    stringify

} = require( '../../../utils' );

const fiveMiniutes = 5 * 60 * 1000;


exports.handler = Object.freeze( async event => {
    
    console.log( 'running /addresses - POST function' );

    try {

        const isWalhallaAddressMode = (

            !!event.body &&
            !!event.body.walhallaAddressMode &&
            (
                event.body.walhallaAddressMode ===
                process.env.WALHALLA_ADDRESS_MODE_SECRET
            ) &&
            !!event.body.exchangeUserId &&
            (typeof event.body.exchangeUserId === 'string') &&
            (event.body.exchangeUserId.length > 5) &&
            (event.body.exchangeUserId.length < 75)
        );

        if( isWalhallaAddressMode ) {

            console.log(
            
                '/addresses - POST function running Walhalla Address Mode🏛'
            );

            const walhallaAddressModeResults = await runWalhallaAddressMode({

                event,
            });

            const results = Object.assign(

                {},
                walhallaAddressModeResults || {}
            );

            const response = getResponse({ body: results });
    
            console.log(
            
                '/addresses - POST function ' +
                'Walhalla Address Mode🏛 ' +
                'executed successfully ' +
                `returning values: ${ stringify( response ) }`
            );
    
            return response;
        }

        const { user } = await beginningDragonProtection({

            queueName: 'getAddress',
            event,

            necessaryDragonDirective: 2,

            ipAddressMaxRate: 15,
            ipAddressTimeRange: fiveMiniutes,

            advancedCodeMaxRate: 15,
            advancedCodeTimeRange: fiveMiniutes,
        });

        const responseBody = await getOrAssignAddressData({ user });   

        const response = getResponse({ body: responseBody });

        console.log(
        
            '/addresses - POST function executed successfully ' +
            `returning values: ${ stringify( response ) }`
        );

        return response;
    }
    catch( err ) {

        console.log( 'error in request to /addresses - POST:', err );

        return handleError( err );
    }
});
 