'use strict';

const uuidv4 = require( 'uuid/v4' );

const {
    verificationCode: {
        expiryTime
    }
} = require( '../../constants' );


module.exports = Object.freeze( ({

    baseId,
    expiryDate = (Date.now() + expiryTime),

}) => {

    return (
        
        `${ baseId }_${ expiryDate }_${ uuidv4().split( '-' ).join( '' ) }`
    );
});