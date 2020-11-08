'use strict';

// Part of https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb

const crypto = require( 'crypto' );
const algorithm = 'aes-256-cbc';
const IV_LENGTH = 16; // For AES, this is always 16
const ValidationError = require( '../errors/ValidationError' );

const {
    encryptionIdToEncryptionPassword,
} = require( '../theKeys' );


const encrypt = Object.freeze( ({
    
    text,
    encryptionId

}) => {
    
    const encryptionPassword = encryptionIdToEncryptionPassword[
    
        encryptionId
    ];

    if( !encryptionPassword ) {

        const errorMessage = (

            `invalid encryptionId: ${ encryptionId }`
        );

        throw new ValidationError( errorMessage );
    }

    const iv = crypto.randomBytes( IV_LENGTH );
    const cipher = crypto.createCipheriv(
        
        algorithm,
        Buffer.from( encryptionPassword ),
        iv
    );
    const encrypted = cipher.update( text );
    const encryptedFinalForm = Buffer.concat( [ encrypted, cipher.final() ] );

    const encryptedText = (

        `${ iv.toString('hex') }:${ encryptedFinalForm.toString('hex') }`
    );

    return encryptedText;
});


const decrypt = Object.freeze( ({
    
    text,
    encryptionId

}) => {
    
    const decryptPassword = encryptionIdToEncryptionPassword[ encryptionId ];

    if( !decryptPassword ) {

        const errorMessage = (

            `invalid encryptionId: ${ encryptionId }`
        );

        throw new ValidationError( errorMessage );
    }

    const textParts = text.split(':');
    const iv = Buffer.from( textParts.shift(), 'hex' );
    const encryptedText = Buffer.from( textParts.join(':'), 'hex' );
    const decipher = crypto.createDecipheriv(
        
        algorithm,
        Buffer.from( decryptPassword ),
        iv
    );
    const decrypted = decipher.update( encryptedText );
    const decryptedFinalForm = Buffer.concat(
        
        [ decrypted, decipher.final() ]
    );

    const decryptedText = decryptedFinalForm.toString();

    return decryptedText;
});
 

module.exports = Object.freeze({
    
    encrypt,
    decrypt,
});
