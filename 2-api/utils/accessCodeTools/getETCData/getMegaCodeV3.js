'use strict';

const uuidv4 = require( 'uuid/v4' );

const {
    
    getRandomIntInclusive

} = require( '../../javascript' );

const MIN_NUMBER_OF_IDS = 15;
const MAX_NUMBER_OF_IDS = 21;


module.exports = Object.freeze( () => {
    
    console.log( 'running getMegaCodeV3' );

    let megaCode = '';

    const numberOfIds = getRandomIntInclusive({

        min: MIN_NUMBER_OF_IDS,
        max: MAX_NUMBER_OF_IDS   
    });

    for( let i = 1; i <= numberOfIds; i++ ) {

        const id = uuidv4().split('-').join('');

        megaCode += id;
    }

    console.log( 'getMegaCodeV3 executed successfully, returning megaCode' );

    return megaCode;
});