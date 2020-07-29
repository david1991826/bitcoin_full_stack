'use strict';

const {

    errorMessages,
    bitcoinApi

} = require( '../../tools' );


module.exports = Object.freeze( async () => {

    try {

        console.log( 'running ensureGetTokenDataEndpointIsActive' );

        const tokenInfo = await bitcoinApi.getTokenInfo();

        const responseDataIsInvalid = !(

            (Object.keys( tokenInfo ).length === 2) &&
            (typeof tokenInfo.isActivated === 'boolean') &&
            (typeof tokenInfo.balanceData === 'object') &&
            (typeof tokenInfo.balanceData.amount === 'number') &&
            (typeof tokenInfo.balanceData.status === 'string')
        );

        if( responseDataIsInvalid ) {

            throw new Error( errorMessages.invalidApiResponse );
        };

        console.log(
            'ensureGetTokenDataEndpointIsActive executed successfully'
        );
    }
    catch( err ) {

        console.log( 'error in getting token data:', err );

        throw new Error( errorMessages.invalidApiResponse );
    }
});
