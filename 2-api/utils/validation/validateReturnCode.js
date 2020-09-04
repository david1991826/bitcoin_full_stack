'use strict';


module.exports = Object.freeze( async ({ returnCode }) => {

    if(
        !returnCode ||
        (typeof returnCode !== 'string') ||
        (returnCode.length < 420) ||
        (returnCode.length > 869)
    ) {

        throw new Error( 'invalid megaCode' );
    }
});