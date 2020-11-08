'use strict';

const request = require( 'request-promise' );
const stringify = require( './stringify' );


module.exports = Object.freeze( async ({
    
    url,
    method,
    headers = {},
    body,
    queryStringData = {},
    json = true,
    doNotLogResponse = false

}) => {
    
    console.log(
        'Running doApiCall: ' +
        'Making API call with the following values: ' +
        stringify({
            'url': url,
            'method': method,
            'headers keys': Object.keys( headers ),
            'body': body,
            'query string data': queryStringData,
            json,
            doNotLogResponse,
        })
    );

    const options = {
        
        url,
        qs: queryStringData,
        headers,
        method,
    };

    if( json ) {

        options.body = body;
        options.json = true;
    }
    else {

        options.formData = body;
    }

    const response = await request( options );

    console.log(
        '🐲🐉do api call executed successfully - 🦌' +
        stringify({
            
            response: doNotLogResponse ? '' : response,
        })
    );
    
    return response;
});