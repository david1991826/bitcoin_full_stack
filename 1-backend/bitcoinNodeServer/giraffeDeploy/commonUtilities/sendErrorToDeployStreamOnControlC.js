'use strict';

const {

    utils: {
        redis: {
            rhinoCombos: {
                giraffeAndTreeStatusUpdate
            },
            doRedisFunction,
        },
    },

} = require( '@npm.m.stecky.efantis/commonprivate' );

const { eventNames } = require( './constants' );


const sendErrorToDeployStream = Object.freeze( ({

    isGiraffe,

}) => doRedisFunction({

    performFunction: ({

        redisClient

    }) => giraffeAndTreeStatusUpdate({

        redisClient,
        eventName: eventNames.common.error,
        information: {

            errorMessage: 'control-c style exit function invoked',
            isGiraffe: (isGiraffe === '🦒'),
        }
    }),

    functionName: 'control-c style exit function'
}));


module.exports = Object.freeze( ({

    isGiraffe
    
}) => {

    console.log( 'initializing control-c send error listener' );

    process.on( 'SIGINT', async () => {

        await sendErrorToDeployStream({

            isGiraffe
        });

        process.exit();
    });

    console.log( 'control-c send error listener successfully initialized' );
});