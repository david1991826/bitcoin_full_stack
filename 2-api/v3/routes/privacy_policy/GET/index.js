'use strict';

const { getMdWebsite } = require( '../../../websiteUtils' );


let website = null;

exports.handler = Object.freeze( async () => {

    console.log( 'running /privacy-policy - GET' );

    website = website || (await getMdWebsite({

        websiteTitle: 'Privacy Policy',
        mdFilePath: process.env.BITCOIN_API_PRIVACY_POLICY_URL,
        transformationKeyValuePairs: {
            bitcoin_api_url: process.env.BITCOIN_API_BASE_URL,
            app_name: 'Bitcoin-Api.io',
        }
    }));

    console.log(
        
        '/privacy-policy - GET, executed successfully, ' +
        'returning website data'
    );

    return website;
});
