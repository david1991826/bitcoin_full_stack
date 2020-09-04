'use strict';

const {

    utils: {
        stringify,
    },

} = require( '@bitcoin-api/full-stack-api' );

const {

    constants: { eventNames }

} = require( 'giraffe-utils' );

const handleTongueFeel = require( './handleTongueFeel' );


module.exports = Object.freeze( async ({

    eventName,
    information

}) => {

    console.log(
        '🧞‍♀️performActionBasedOnDeployEvent - ' +
        `🦒giraffe got ${ eventName } event with information: ` +
        stringify( information )
    );

    switch( eventName ) {

        case eventNames.giraffe.lickComplete:
        case eventNames.leaf.tigerCommand:
        case eventNames.tiger.tigerEnlightenment:
        case eventNames.leaf.serviceIsGood:

            console.log(
                `event ${ eventName } is not relevant ` +
                'to the giraffe🦒🚫📰 - skipping event'
            );

            break;

        case eventNames.leaf.tongueFeel:

            await handleTongueFeel({

                information
            });

            break;

        default:
            
            throw new Error(
                'performActionBasedOnDeployEvent error - ' +
                `unexpected ${ eventName }`
            );
    }

    console.log(
        '🧞‍♀️performActionBasedOnDeployEvent - ' +
        '🦒giraffe executed the function successfully✅✅'
    );
});
