'use strict';

require( 'dotenv' ).config();

const express = require( 'express' );
const app = express();
const port = 3000;

const htmlFilePath = process.env.HOME_WEBSITE_HTML_PATH;

const {

    getWebsite, getFooterComponents, getComponent

} = require( process.env.WEBSITE_UTILS_PATH );


app.get( '/', async ( req, res ) => {
    
    const [
        {
            footerCssHtml,
            footerHtml
        },
        apiStatusLightAndStatusText

     ] = await Promise.all([
        
        getFooterComponents(),
        getComponent({

            componentPath: (
                process.env.HOME_WEBSITE_STATUS_BOX_IS_ACTIVE_ON_HTML_PATH
            )
        })
    ]);

    const transformationKeyValuePairs = Object.freeze({

        app_name: 'Api-Bitcoin.io',
        api_status_light_and_text: apiStatusLightAndStatusText,
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