'use strict';

const {
    utils: { stringify }
} = require( '@npm.m.stecky.efantis/commonprivate' );


const {
    doApiCall
} = require( '../../../../utils' );

const {

    errorMessages

} = require( '../tools' );


module.exports = Object.freeze( async ({

    resource,
    addTokenToRequest = false,
    method,
    headers = {},
    getIfResponseIsValid,

}) => {

    const url = `${ process.env.BITCOIN_API_BASE_URL }/${ resource }`;

    if( addTokenToRequest ) {

        headers.Token = process.env.BITCOIN_API_TOKEN_FOR_MONITORING_TESTS;
    }

    const response = await doApiCall({

        url,
        method,
        headers,
        doNotLogResponse: true,
    });

    const responseIsInvalid = !getIfResponseIsValid( response );

    if( responseIsInvalid ) {

        console.log(
            'endpoint test failed for:',
            stringify({
                method,
                resource,
            })
        );

        throw new Error( errorMessages.invalidApiResponse );
    }
});
