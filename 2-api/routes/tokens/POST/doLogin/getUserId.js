'use strict';

const uuidv4 = require( 'uuid/v4' );


module.exports = Object.freeze( () => {
    
    console.log( 'running getUserId' );

    const userId = uuidv4().split('-').join('');

    console.log( 'getUserId executed successfully, returning id:', userId );

    return userId;
});