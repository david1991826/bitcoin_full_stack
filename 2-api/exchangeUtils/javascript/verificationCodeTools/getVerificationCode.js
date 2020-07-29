'use strict';

const uuidv4 = require( 'uuid/v4' );

const oneDay = 24 * 60 * 60 * 1000;


module.exports = Object.freeze( ({

    baseId,
    expiryDate = (Date.now() + oneDay),

}) => {

    return (
        
        `${ baseId }_${ expiryDate }_${ uuidv4().split( '-' ).join( '' ) }`
    );
});