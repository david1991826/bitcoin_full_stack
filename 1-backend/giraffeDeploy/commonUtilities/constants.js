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

} = require( '@bitcoin-api/full-stack-api' );

const deployCommands = {

    feeDataBot: refreshingDrank,
    withdrawsBot: monkeyPaw,
    depositsBot: juiceCamel,
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
