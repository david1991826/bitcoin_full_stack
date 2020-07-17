'use strict';


module.exports = Object.freeze( async ({ megaCode }) => {

    if(
        !megaCode ||
        (typeof megaCode !== 'string') ||
        (megaCode.length < 420) ||
        (megaCode.length > 769)
    ) {

        throw new Error( 'invalid megaCode' );
    }
});