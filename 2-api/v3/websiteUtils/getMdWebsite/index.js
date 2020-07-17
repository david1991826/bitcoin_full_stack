'use strict';

const {
    utils: {
        stringify
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const MarkdownIt = require( 'markdown-it' );
const request = require( 'request-promise' );
const defaultHtmlFilePath = `${ __dirname }/defaultMdWebsite.html`;

const getWebsite = require( '../getWebsite' );
const getFooterComponents = require( '../getFooterComponents' );


module.exports = Object.freeze( async ({

    websiteTitle = 'Bitcoin-Api.io',
    htmlFilePath = defaultHtmlFilePath,
    mdFilePath,
    transformationKeyValuePairs = {},
    
}) => {

    console.log(
        
        `running getMdWebsite with the following values: ${
            
            stringify({
                htmlFilePath,
                mdFilePath,
                transformationKeyValuePairs,
            })
        }`
    );
    
    const md = new MarkdownIt();

    const [
        
        mdFileString,

        {
            footerCssHtml,
            footerHtml
        }
        
    ] = await Promise.all([
        
        request({

            uri: mdFilePath,
            method: 'GET',
        }),
        
        getFooterComponents()
    ]);

    const mdHtmlString = md.render( mdFileString );

    const website = await getWebsite({
        
        htmlFilePath,
        transformationKeyValuePairs: Object.assign(
            {
                app_name: 'Bitcoin-Api.io',
            },
            transformationKeyValuePairs,
            {
                md_html_string: mdHtmlString,
                website_title: websiteTitle,
                footer_css_html: footerCssHtml,
                footer_html: footerHtml,
            }
        ),
    });

    console.log(
        `getMdWebsite executed successfully for: ${ mdFilePath }`
    );

    return website;
});