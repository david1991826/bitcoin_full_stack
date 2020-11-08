'use strict';

const {

    utils: {
        stringify,
    },

    // constants: {
    //     redis: {
    //         streamIds
    //     }
    // }

} = require( '@bitcoin-api/full-stack-api' );

const {

    constants: {
        eventNames
    }

} = require( 'giraffe-utils' );

const handleLickComplete = require( './handleLickComplete' );
const handleTigerEnlightenment = require( './handleTigerEnlightenment' );


module.exports = Object.freeze( ({

    forceDeploy

}) => Object.freeze( async ({

    eventName,
    information

}) => {

    console.log(
        '🧞‍♀️performActionBasedOnDeployEvent - ' +
        `🌴tree got ${ eventName } event with information: ` +
        stringify( information )
    );

    switch( eventName ) {

        case eventNames.leaf.tongueFeel:
        case eventNames.leaf.tigerCommand:
        case eventNames.leaf.serviceIsGood:

            console.log(
                `event ${ eventName } is not relevant ` +
                'to the tree🎄🚫📰 - skipping event'
            );

            break;
            
        case eventNames.giraffe.lickComplete:

            await handleLickComplete({

                information,
                forceDeploy,
            });

            break;

        case eventNames.tiger.tigerEnlightenment:

            await handleTigerEnlightenment({

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
}));
