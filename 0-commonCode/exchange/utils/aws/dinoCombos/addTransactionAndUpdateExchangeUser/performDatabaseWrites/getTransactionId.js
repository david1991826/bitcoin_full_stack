'use strict';

const uuidv4 = require( 'uuid/v4' );


module.exports = Object.freeze( () => {

    const transactionId = (

        `transaction_${ uuidv4().split( '-' ).join( '' ) }_${ Date.now() }`
    );

    return transactionId;
});