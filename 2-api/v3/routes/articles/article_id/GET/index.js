'use strict';

const {
    getWebsite,
    getFooterComponents,
    getComponent
} = require( '../../../../websiteUtils' );

const htmlFilePath = `${ __dirname }/website.html`;
let website = null;


exports.handler = async () => {


    if( !website ) {

        const [

            {
                footerCssHtml,
                footerHtml,
            },
            rawGetGetWebsiteCode
    
        ] = await Promise.all([
            getFooterComponents(),
            getComponent({
                componentPath: `${ __dirname }/getGetWebsiteCode/index.js`
            })
        ]);
        
        const getGetWebsiteCode = eval(
            
            `(${rawGetGetWebsiteCode.toString()})`
        );

        const getWebsiteCode = getGetWebsiteCode({
        
            rootPath: `${ __dirname }/getGetWebsiteCode`
        });
    
        const transformationKeyValuePairs = Object.freeze({
    
            app_name: 'Bitcoin-Api.io',
            react_code: await getWebsiteCode(),
            footer_css_html: footerCssHtml,
            footer_html: footerHtml,
        });

        website = await getWebsite({
    
            transformationKeyValuePairs,
            htmlFilePath,
        });
    }

    return website;
};
