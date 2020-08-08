'use strict';

const crypto = require( 'crypto' );


module.exports = Object.freeze( ({

    megaCode

}) => {

    console.log( 'running getTemplarCode' );

    const rhinoMegaCode = megaCode.substring( 0, 5 );
    // const turtleMegaCode = megaCode.substring( 5, 8 );
    // const lizardMegaCode = megaCode.substring( 8, 10 );
    // const coyoteMegaCode = megaCode.substring( 10 );
    const ultraCoyoteMegaCode = megaCode.substring( 5 );

    const experienceMegaCode = (

        // turtleMegaCode +
        // lizardMegaCode +
        // coyoteMegaCode +
        ultraCoyoteMegaCode +
        rhinoMegaCode
    );

    const templarCode = (

        crypto
            .createHash( 'md5' )
            .update( experienceMegaCode )
            .digest( 'hex' )
    );

    console.log(
        'getTemplarCode executed successfully - ' +
        `got templar code: ${ templarCode }`
    );

    return templarCode;
});

