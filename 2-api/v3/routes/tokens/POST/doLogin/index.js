'use strict';

const {
    
    accessCodeTools: {
        getReturnCode,
        getETCData
    },

} = require( '../../../../utils' );

const getUserId = require( './getUserId' );
const addUserToDatabase = require( './addUserToDatabase' );


module.exports = Object.freeze( async ({

    ipAddress

}) => {
    
    console.log( 'running doLogin' );

    const {

        megaCode,
        encryptedTemplarCode,
        encryptionId

    } = getETCData();

    const userId = getUserId();

    await addUserToDatabase({

        userId,
        accessCode: encryptedTemplarCode,
        metadata: {

            experientialIdentifier: 3.01,
            initialIpAddress: ipAddress,
            creationDate: Date.now()
        },
        encryptionId,
    });

    const token = getReturnCode({ userId, megaCode });

    console.log(
        'doLogin executed successfully, returning the token in an object.'
    );

    return {
        
        token
    };
});