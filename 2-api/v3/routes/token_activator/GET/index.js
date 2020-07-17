'use strict';

const {
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const htmlFilePath = `${ __dirname }/website.html`;

const baseTransformationKeyValuePairs = Object.freeze({

    google_captcha_key: process.env.GOOGLE_CAPTCHA_KEY,
    bitcoin_api_url: process.env.BITCOIN_API_BASE_URL,
    app_name: isProductionMode ? 'Bitcoin-Api.io' : 'Api-Bitcoin.io',
});

const { getWebsite, getFooterComponents } = require( '../../../websiteUtils' );
    
let website = null;

const getTokenActivatorWebsite = Object.freeze( async () => {
    
    const {
        
        footerCssHtml,
        footerHtml

    } = await getFooterComponents();

    const transformationKeyValuePairs = Object.assign(

        {},
        baseTransformationKeyValuePairs,
        {
            footer_css_html: footerCssHtml,
            footer_html: footerHtml,
        }
    );

    const tokenActivator = await getWebsite({

        transformationKeyValuePairs,
        htmlFilePath,
    });

    return tokenActivator;
});


exports.handler = Object.freeze( async () => {

    console.log( 'running /token_activator - GET' );
    
    website = website || (await getTokenActivatorWebsite());

    console.log(
        
        '/token_activator - GET, executed successfully, ' +
        'returning website data'
    );

    return website;
});
