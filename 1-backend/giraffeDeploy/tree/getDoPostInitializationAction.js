'use strict';

const {

    utils: {
        redis: {
            doRedisFunction,
        },
        // stringify,
    },

} = require( '@bitcoin-api/full-stack-api' );

const {

    giraffeAndTreeStatusUpdate,
    constants

} = require( '../commonUtilities' );


module.exports = Object.freeze( ({

    deployId,
    deployCommand

}) => async () => {
    
    await doRedisFunction({

        performFunction: async ({

            redisClient

        }) => {

            await giraffeAndTreeStatusUpdate({
    
                redisClient,
                eventName: constants.eventNames.leaf.tongueFeel,
                // eventName: constants.eventNames.giraffe.lick,
                information: {
                    deployId,
                    eventOrder: 1,
                    deployCommand
                }
            });
        },

        functionName: 'leaf feel tongue'
    });
});
