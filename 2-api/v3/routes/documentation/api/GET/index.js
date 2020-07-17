'use strict';

const { getMdWebsite } = require( '../../../../websiteUtils' );


let website = null;

exports.handler = Object.freeze( async () => {

    console.log( 'running /documentation/api - GET' );

    website = website || (await getMdWebsite({

        websiteTitle: 'API Documentation',
        mdFilePath: process.env.BITCOIN_API_API_DOCUMENTATION_URL,
    }));

    console.log(
        
        '/documentation/api - GET, executed successfully, ' +
        'returning website data'
    );

    return website;
});
