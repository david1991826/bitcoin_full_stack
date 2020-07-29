'use strict';

const ultimateEncryptionObjects = Object.freeze([

    Object.freeze({
        id: process.env.MEGA_CODE_ENCRYPTION_ID_4,
        password: process.env.MEGA_CODE_ENCRYPTION_PASSWORD_4,
    }),
]);

const { id, password } = ultimateEncryptionObjects[
    
    ultimateEncryptionObjects.length - 1
];

const encryptionIds = [];
const encryptionIdToEncryptionPassword = {};

for( const encryptionObject of ultimateEncryptionObjects ) {

    encryptionIds.push( encryptionObject.id );

    encryptionIdToEncryptionPassword[
        encryptionObject.id
    ] = encryptionObject.password;
}


Object.freeze( encryptionIds );
Object.freeze( encryptionIdToEncryptionPassword );


module.exports = Object.freeze({

    encryptionIdToUse: id,
    encryptionPasswordToUse: password,
    encryptionIdToEncryptionPassword,
    encryptionIds,
});
