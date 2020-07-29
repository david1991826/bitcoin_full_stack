'use strict';

const {

    errorMessages,
    bitcoinApi

} = require( '../../tools' );


module.exports = Object.freeze( async () => {

    try {

        console.log( 'running ensureGetFeeDataEndpointIsActive' );

        const feeData = await bitcoinApi.getFeeData();

        const responseDataIsInvalid = !(

            (Object.keys( feeData ).length === 1) &&
            (typeof feeData.fee === 'number')
        );

        if( responseDataIsInvalid ) {

            throw new Error( errorMessages.invalidApiResponse );
        };

        console.log(
            'ensureGetFeeDataEndpointIsActive executed successfully'
        );
    }
    catch( err ) {

        console.log( 'error in getting fee data:', err );

        throw new Error( errorMessages.invalidApiResponse );
    }
});
