'use strict';

const BitcoinApi = require( 'bitcoin-api' );

const bitcoinApi = new BitcoinApi({

    livenetMode: true,
    livenetToken: process.env.CORONA_VIRUS_BITCOIN_API_IO_TOKEN,
});

const {
    getWebsite,
    getFooterComponents,
    getComponent
} = require( '../../../websiteUtils' );

const htmlFilePath = `${ __dirname }/website.html`
let previousAmountDonated = -1;
let website = null;

const getAmountDonated = Object.freeze( async () => {
            
    try {

        const {
        
            balanceData: { amount }
            
        } = await bitcoinApi.getTokenInfo();

        return `${ amount } BTC`;
    }
    catch( err ) {

        console.log( 'error in getAmountDonated:', err );

        return 'error';
    }
});


exports.handler = async () => {

    const amountDonated = await getAmountDonated();

    if( !website || (amountDonated !== previousAmountDonated)) {

        previousAmountDonated = amountDonated;

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
        
            rootPath: `${ __dirname }/getGetWebsiteCode`,
            amountDonated
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
