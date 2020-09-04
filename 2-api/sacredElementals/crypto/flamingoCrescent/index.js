'use strict';

const crypto = require( 'crypto' );

const algorithm = 'aes-256-cbc';
const IV_LENGTH = 16;

const encryptionId = process.env.EXCHANGE_FLAMINGO_ENCRYPTION_ID;
const encryptionPassword = process.env.EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD;
const styleEncryptTag = '__style__';


module.exports = Object.freeze( ({
    
    text,

}) => {

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

    const fullEncryptedText =  (
        
        `${ encryptionId }${ styleEncryptTag }${ encryptedText }`
    );

    return fullEncryptedText;
});
