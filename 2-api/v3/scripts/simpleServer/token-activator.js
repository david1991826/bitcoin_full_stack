'use strict';

require( 'dotenv' ).config();

const express = require( 'express' );
const app = express();
const port = 3000;

const htmlFilePath = process.env.TOKEN_ACTIVATOR_HTML_PATH;

const {

    getWebsite, getFooterComponents

} = require( process.env.WEBSITE_UTILS_PATH );


app.get( '/', async ( req, res ) => {
    
    const {
        
        footerCssHtml,
        footerHtml

    } = await getFooterComponents();

    const transformationKeyValuePairs = Object.freeze({

        google_captcha_key: process.env.GOOGLE_CAPTCHA_KEY,
        bitcoin_api_url: process.env.BITCOIN_API_BASE_URL,
        app_name: 'Api-Bitcoin.io',
        footer_css_html: footerCssHtml,
        footer_html: footerHtml,
    });

    const website = await getWebsite({

        transformationKeyValuePairs,
        htmlFilePath,
    });
    res.setHeader( 'Content-Type', 'text/html' );
    res.send( website );
});


app.listen(
    port,
    () => console.log( `Simple server listening on port ${ port }.` )
);