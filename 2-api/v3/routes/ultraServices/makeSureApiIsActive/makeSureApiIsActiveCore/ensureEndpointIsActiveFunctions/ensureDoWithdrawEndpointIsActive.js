'use strict';

const {
    constants: {
        environment: {
            isProductionMode,
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {

    errorMessages,
    bitcoinApi

} = require( '../../tools' );

const { BitcoinApiError } = require( 'bitcoin-api/utils/errors' );


module.exports = Object.freeze( async () => {

    try {
        console.log( 'running ensureDoWithdrawEndpointIsActive' );

        await bitcoinApi.withdraw({

            amount: 50,
            address: isProductionMode ? (

                '3AfV9QQQTgtCH6YEjBpDTyH5sswgGD5MLp'
                
            ) : 'mgXi9VCAmwaEGszk5yhqkigptTVQM33uhx',
        });

        console.log(
            'error: withdraw succeeded when it should have failed'
        );

        throw new Error( errorMessages.invalidApiResponse );
    }
    catch( err ) {

        const errorIsUnexpected = !(

            (err instanceof BitcoinApiError) &&
            err.message.includes( 'statusCode' ) &&
            err.message.includes( '400' )
        );

        if( errorIsUnexpected ) {

            console.log(
                (
                    'an unexpected error occurred in ensuring the ' +
                    'withdraw endpoint works:'
                ),
                err
            );

            throw new Error( errorMessages.invalidApiResponse );
        }

        console.log(
            'ensureDoWithdrawEndpointIsActive executed successfully'
        );
    }
});
