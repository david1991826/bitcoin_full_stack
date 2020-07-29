'use strict';

const {
    utils: {
        redis: {
            getClient,
        },
        // stringify
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

const makeSureApiIsActiveCore = require( './makeSureApiIsActiveCore' );


exports.handler = Object.freeze( async () => {

    console.log( 'running 🦌🌳makeSureApiIsActive🌳🦌' );

    const redisClient = getClient();

    try {

        // if( 1 == 1 ) throw new Error( 'fake error' );

        await makeSureApiIsActiveCore({

            redisClient
        });

        redisClient.quit();

        console.log( '🦌🌳makeSureApiIsActive executed successfully🌳🦌' );

        return {
            statusCode: 200,
            body: {},
        };
    }
    catch( err ) {

        console.log( 'error in 🦌🌳makeSureApiIsActive🌳🦌:', err );

        redisClient.quit();

        throw err;
    }
});
