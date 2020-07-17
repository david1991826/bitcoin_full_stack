'use strict';

const stringify = require( '../../stringify' );
const Crypto = require( '../../javascript/Crypto' );
const theKeys = require( '../../theKeys' );
const getMegaCodeV3 = require( './getMegaCodeV3' );
const getTemplarCode = require( '../getTemplarCode' );


module.exports = Object.freeze( ({

    encryptionId = theKeys.encryptionIdToUse

} = { encryptionId: theKeys.encryptionIdToUse }) => {

    console.log(
        'running getETCData with the ' +
        `following encryption id: ${ encryptionId }`
    );
    
    const megaCode = getMegaCodeV3();

    const templarCode = getTemplarCode({

        megaCode
    });

    const encryptedTemplarCode = Crypto.encrypt({

        text: templarCode,
        encryptionId
    });

    console.log(
        `getETCData executed successfully: ${ stringify({

            ['Size of Mega Code']: megaCode.length,
            encryptedTemplarCode,
        }) }`
    );
    
    return {
        
        megaCode,
        encryptedTemplarCode,
        encryptionId
    };
});