'use strict';

const {

    errorMessages,
    bitcoinApi

} = require( '../../tools' );


module.exports = Object.freeze( async () => {

    try {
        console.log( 'running ensureCreateOrGetAddressEndpointIsActive' );

        const adderssData = await bitcoinApi.createOrGetAddress();

        const responseDataIsInvalid = !(

            (Object.keys( adderssData ).length === 1) &&
            (
                (typeof adderssData.address === 'string')// &&
                // (typeof adderssData.timeOfExpiry === 'number') 
            ) ||
            (
                (typeof adderssData.address === null) // &&
                // (typeof adderssData.timeOfExpiry === null) 
            )
        );

        if( responseDataIsInvalid ) {

            throw new Error( errorMessages.invalidApiResponse );
        }

        console.log(
            'ensureCreateOrGetAddressEndpointIsActive executed successfully'
        );
    }
    catch( err ) {

        console.log( 'error in getting creating/getting address data:', err );

        throw new Error( errorMessages.invalidApiResponse );
    }
});
