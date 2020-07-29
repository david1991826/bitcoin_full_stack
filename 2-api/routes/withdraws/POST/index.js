'use strict';

const withdrawMoney = require( './withdrawMoney' );

const {
    
    beginningDragonProtection,
    getResponse,
    handleError,
    stringify

} = require( '../../../utils' );

const fiveMinutes = 5 * 60 * 1000;


exports.handler = Object.freeze( async event => {
    
    console.log( 'running /withdraws - POST function' );

    try {
        const { user } = await beginningDragonProtection({
            
            queueName: 'withdrawMoney',
            
            event,

            necessaryDragonDirective: 2,
            
            ipAddressMaxRate: 10,
            ipAddressTimeRange: fiveMinutes,
            
            advancedCodeMaxRate: 10,
            advancedCodeTimeRange: fiveMinutes,
        });

        const withdrawMoneyResults = await withdrawMoney({
            event,
            user
        });

        const response = getResponse({ body: withdrawMoneyResults });

        console.log(
            '/withdraws - POST function executed successfully ' +
            `returning values: ${ stringify( response ) }`
        );

        return response;
    }
    catch( err ) {

        console.log( 'error in request to /withdraws - POST:', err );

        return handleError( err );
    }
});
 