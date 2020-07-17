'use strict';

require( 'dotenv' ).config();

const express = require( 'express' );
const app = express();
// const fs = require( 'fs' );
const port = 3000;

const { getMdWebsite } = require( process.env.WEBSITE_UTILS_PATH );


app.get( '/', async ( req, res ) => {
    
    const website = await getMdWebsite({

        websiteTitle: 'API Documentation',
        mdFilePath: process.env.BITCOIN_API_API_DOCUMENTATION_URL,
    });
    res.setHeader( 'Content-Type', 'text/html' );
    res.send( website );
});


app.listen(
    port,
    () => console.log( `Simple server listening on port ${ port }.` )
);