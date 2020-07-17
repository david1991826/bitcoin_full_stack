'use strict';

const crypto = require( 'crypto' );

const algorithm = 'aes-256-cbc';

const encryptionId = process.env.EXCHANGE_XOOVO_ENCRYPTION_ID;
const encryptionPassword = process.env.EXCHANGE_XOOVO_ENCRYPTION_PASSWORD;
const styleEncryptTag = '__power__';

const encryptionIdToEncryptionPassword = {

    [encryptionId]: encryptionPassword,
};


module.exports = Object.freeze( ({
    
    text,

}) => {

    const splitText = text.split( styleEncryptTag );

    if( splitText.length !== 2 ) {

        const errorMessage = `invalid text to decrypt: ${ text }`;

        throw new Error( errorMessage );
    }

    const [ encryptionId, textToDecrypt ] = splitText;
    
    const decryptPassword = encryptionIdToEncryptionPassword[ encryptionId ];

    if( !decryptPassword ) {

        const errorMessage = `invalid encryptionId: ${ encryptionId }`;

        throw new Error( errorMessage );
    }

    const textParts = textToDecrypt.split(':');
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
