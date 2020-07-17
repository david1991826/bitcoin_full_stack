'use strict';

const getComponent = require( '../getComponent' );


module.exports = Object.freeze( async () => {
    
    const [

        footerCss,
        footerHtml,

    ] = await Promise.all([

        getComponent({ componentPath: `${ __dirname }/theFooter.css` }),
        getComponent({ componentPath: `${ __dirname }/theFooter.html` }),
    ]);

    return {

        footerCssHtml: `<style>${ footerCss }</style>`,
        footerHtml, 
    };
});
