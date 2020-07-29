'use strict';

const uuidv4 = require( 'uuid/v4' );

const getUuidComponent = Object.freeze( () => {

    return uuidv4().split( '-' ).join( '' );
});

const getBaseId = Object.freeze( () => {

    return (
        getUuidComponent() +
        getUuidComponent() +
        getUuidComponent()
    );
});


module.exports = Object.freeze( () => {

    const baseId = getBaseId();

    return `login_token-${ baseId }`;
});