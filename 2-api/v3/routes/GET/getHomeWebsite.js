'use strict';

const {
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const htmlFilePath = `${ __dirname }/website.html`;
const statusBoxIsActiveLightAndText = isProductionMode ? (
    `${ __dirname }/statusBox/isActive/on.html`
) : (
    `${ __dirname }/statusBox/isActive/onStaging.html`
);
const statusBoxIsNotActiveLightAndText = (

    `${ __dirname }/statusBox/isActive/off.html`
);

const baseTransformationKeyValuePairs = Object.freeze({

    app_name: isProductionMode ? 'Bitcoin-Api.io' : 'Api-Bitcoin.io',
});

const {
    getWebsite,
    getFooterComponents,
    getComponent
} = require( '../../websiteUtils' );


module.exports = Object.freeze( async ({

    apiIsInOmegaForm

}) => {
    
    const [
        {
            footerCssHtml,
            footerHtml
        },
        apiStatusLightAndStatusText

     ] = await Promise.all([
        
        getFooterComponents(),
        getComponent({

            componentPath: apiIsInOmegaForm ? (

                statusBoxIsActiveLightAndText

            ) : (

                statusBoxIsNotActiveLightAndText
            ),
        })
    ]);

    const transformationKeyValuePairs = Object.assign(

        {},
        baseTransformationKeyValuePairs,
        {
            api_status_light_and_text: apiStatusLightAndStatusText,
            footer_css_html: footerCssHtml,
            footer_html: footerHtml,
        }
    );

    const homeWebsite = await getWebsite({

        transformationKeyValuePairs,
        htmlFilePath,
    });

    return homeWebsite;
});
