'use strict';

const {
    business: {
        getIfApiIsActive,
        getIfApiIsOnData
    },
} = require( '../../../../utils' );

const {

    errorMessages

} = require( '../tools' );

const endpointDataForTesting = require( './endpointDataForTesting' );
const ensureEndpointIsActive = require( './ensureEndpointIsActive' );

const {

    ensureGetFeeDataEndpointIsActive,
    ensureGetTokenDataEndpointIsActive,
    ensureCreateOrGetAddressEndpointIsActive,
    // ensureDoWithdrawEndpointIsActive

} = require( './ensureEndpointIsActiveFunctions' );


module.exports = Object.freeze( async ({

    redisClient

}) => {
    
    console.log( 'running makeSureApiIsActiveCore' );

    const [ // optimization due to main use case, bitcoin api will be on

        {
            bitcoinApiIsOn
        },

        apiIsActive

    ] = await Promise.all([
        
        getIfApiIsOnData({

            redisClient
        }),

        getIfApiIsActive({

            redisClient
        })
    ]);

    if( !bitcoinApiIsOn ) {

        return console.log(
            'makeSureApiIsActiveCore - bitcoin api is off - no op'
        );
    }

    if( !apiIsActive ) {

        throw new Error( errorMessages.apiNotActive );
    }

    const ensureEndpointIsActiveRequests = [

        ensureGetFeeDataEndpointIsActive(),
        ensureGetTokenDataEndpointIsActive(),
        ensureCreateOrGetAddressEndpointIsActive(),
        // ensureDoWithdrawEndpointIsActive()
    ];

    for( const endpointDatumForTesting of endpointDataForTesting ) {

        const endpointIsActiveEnsure = ensureEndpointIsActive(
            
            endpointDatumForTesting
        );

        ensureEndpointIsActiveRequests.push( endpointIsActiveEnsure );
    }

    console.log(
        
        'number of endpoint ensure is active requests:',
        ensureEndpointIsActiveRequests.length
    );

    await Promise.all( ensureEndpointIsActiveRequests );

    console.log( 'makeSureApiIsActiveCore executed successfully' );
});
