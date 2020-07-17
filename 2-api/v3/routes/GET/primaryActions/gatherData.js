'use strict';

const {
    utils: {
        redis: {
            doRedisRequest,
        },
        stringify
    },
    constants: {
        redis: {
            streamIds: {
                websiteIpAddressDatav1
            }
        },
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze( async ({

    ipAddress,
    redisClient,
    deviceOrMaybeOtherCoolData

}) => {
    
    console.log( '☢️🐑running gatherData' );

    const time = (new Date()).toLocaleString();

    const redisArguments = [
        websiteIpAddressDatav1,
        'MAXLEN',
        '~',
        1000000,
        '*',
        'ipAddress',
        ipAddress,
        'time',
        time
    ];

    if( !!deviceOrMaybeOtherCoolData ) {

        redisArguments.push(

            'coolData',
            deviceOrMaybeOtherCoolData
        );
    }

    await doRedisRequest({

        client: redisClient,
        command: 'xadd',
        redisArguments,
    });

    console.log(
        '☢️🐑gatherData - ' +
        '☢️🐑ip address tracking executed successfully - ' +
        `tracked data: ${ stringify({
            ipAddress,
            time,
            deviceOrMaybeOtherCoolData,
        }) }`
    );
});
