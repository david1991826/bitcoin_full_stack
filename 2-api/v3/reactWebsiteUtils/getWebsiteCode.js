'use strict';

const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );


module.exports = Object.freeze( ({

    mostParentElementStyle,
    childrenElements = [],

}) => {

    const e = React.createElement;
    
    const mostParentElement = e(
        'div',
        {
            style: mostParentElementStyle
        },
        ...childrenElements
    );
    
    const websiteCode = ReactDOMServer.renderToString( mostParentElement );

    return websiteCode;
});