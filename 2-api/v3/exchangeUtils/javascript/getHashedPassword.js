'use strict';

const crypto = require( 'crypto' );


module.exports = Object.freeze( ({

    password,

}) => {

    const hashedPassword = crypto.createHash(

        'md5'

    ).update(
        
        password

    ).digest( 'hex' );

    return hashedPassword;
});