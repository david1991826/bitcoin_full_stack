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
            creationDate: Date.now(),

            // bypassed activation
            isHumanInformation: {
                humanIpAddress: 'Ip Man (Donnie Yen)',
                humanScore: 420,
                isHuman: true,
            },
            privacyPolicy: {
                agrees: true,
                ipAddressOfAgreement: 'drIp (Wunna Gunna)',
                timeOfAgreement: 'The Power of Now'
            },
            tos: {
                agrees: true,
                ipAddressOfAgreement: '69',
                timeOfAgreement: 'Protoss'
            },
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