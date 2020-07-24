'use strict';

const {
    constants: {
        redis: {
            streamIds: {
                bankStatusQueueId
            }
        }
    },
    utils: {
        redis: {
            getClient,
            doRedisRequest
        },
        stringify,
        server: {
            getServiceNameStreamKey
        }
    }

} = require( '@bitcoin-api.io/common-private' );

const megaServerId = process.env.ID_OF_CURRENT_MEGA_SERVER;

if( !megaServerId ) {

    throw new Error(
        'signalOnStatusToCommandCenter initialization error: ' +
        'missing required megaServerId'
    );
}


module.exports = Object.freeze( async ({

    serviceName,

}) => {

    if( !serviceName ) {

        throw new Error( 'expected service name🐒' );
    }

    console.debug(
        '☢️🐑running signalOnStatusToCommandCenter: ' +
        stringify({ serviceName })
    );

    const client = getClient();

    const streamKey = getServiceNameStreamKey({
        serviceName,
        megaServerId,
    });

    try {

        await doRedisRequest({

            client,
            command: 'xadd',
            redisArguments: [
                bankStatusQueueId,
                'MAXLEN',
                '~',
                2000,
                '*',
                'serviceNameStreamKey',
                streamKey
            ]
        });

        console.debug(
            '☢️🐑signalOnStatusToCommandCenter executed successfully'
        );

        client.quit();
    }
    catch( err ) {

        console.log(
            '🧐error in signalOnStatusToCommandCenter:',
            err
        );

        client.quit();

        throw err;
    }
});
