'use strict';

const {
    
    constants: {

        computerServerServiceNames: {

            refreshingDrank,
            monkeyPaw,
            juiceCamel
        },

        redis: {
            streamIds: {
                zarbonDeploy
            }
        },

        deploy: {
            eventNames
        }
    }

} = require( '@npm.m.stecky.efantis/commonprivate' );

const deployCommands = {

    feeFee: refreshingDrank,
    korg: monkeyPaw,
    theomega: juiceCamel,
};


module.exports = Object.freeze({

    streamIds: {

        zarbonDeploy,
    },

    deployCommands,

    deployCommandList: Object.values( deployCommands ),

    eventNames: {
        giraffe: {
            lick: 'lick', // (🦒😋🍃)
            lickComplete: 'lickComplete',
        },
        leaf: {
            tongueFeel: 'tongueFeel', // (🦒😋🍃)
            tigerCommand: eventNames.leaf.tigerCommand,
            serviceIsGood: 'serviceIsGood',
        },
        tiger: {
            tigerEnlightenment: eventNames.tiger.tigerEnlightenment
        },
        common: {
            error: 'error'
        }
    },

    errorListenerMessages: {
        error: 'error',
        done: 'done',
    },
});
