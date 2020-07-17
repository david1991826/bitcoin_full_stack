'use strict';

const { getMdWebsite } = require( '../../../websiteUtils' );


let website = null;

exports.handler = Object.freeze( async () => {

    console.log( 'running /terms-of-service - GET' );

    website = website || (await getMdWebsite({

        websiteTitle: 'Terms of Service',
        mdFilePath: process.env.BITCOIN_API_TERMS_OF_SERVICE_URL,
        transformationKeyValuePairs: {
            bitcoin_api_url: process.env.BITCOIN_API_BASE_URL,
            app_name: 'Bitcoin-Api.io',
        }
    }));

    console.log(
        
        '/terms-of-service - GET, executed successfully, ' +
        'returning website data'
    );

    return website;
});
