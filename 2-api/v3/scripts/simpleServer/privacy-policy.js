'use strict';

require( 'dotenv' ).config();

const express = require( 'express' );
const app = express();
// const fs = require( 'fs' );
const port = 3000;

const { getMdWebsite } = require( process.env.WEBSITE_UTILS_PATH );


app.get( '/', async ( req, res ) => {
    
    const website = await getMdWebsite({

        websiteTitle: 'Privacy Policy',
        mdFilePath: process.env.BITCOIN_API_PRIVACY_POLICY_URL,
        transformationKeyValuePairs: {
            bitcoin_api_url: process.env.BITCOIN_API_BASE_URL,
            app_name: 'Bitcoin-Api.io',
        }
    });
    res.setHeader( 'Content-Type', 'text/html' );
    res.send( website );
});


app.listen(
    port,
    () => console.log( `Simple server listening on port ${ port }.` )
);