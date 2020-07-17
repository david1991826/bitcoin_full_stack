'use strict';

const logger = require( '../loglevels' ).setLocationAndGetLogger(
    __filename,
    '00'
);
const stringify = require( '../stringify' );


module.exports = Object.freeze( async ({

    client,
    command,
    redisArguments = []

}) => {

    logger.debug(
        'Doing Redis Request:',
        stringify({
            command,
            redisArguments
        })
    );

    return await new Promise( ( resolve, reject ) => {

        const callback = ( err, redisResponse ) => {

            if( !!err ) {

                console.log(
                    'Error in Redis Request:',
                    err
                );

                return reject( err );
            }

            logger.debug(
                'Redis Request with the following args successful:',
                stringify({
                    command,
                    redisArguments
                }),
                'here is the redis response:',
                redisResponse
            );

            resolve( redisResponse );
        };
        
        client[ command ]( ...redisArguments, callback );
    });
});
