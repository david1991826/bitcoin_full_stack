'use strict';

const {
    constants: {
        redis: {
            streamIds,
        },
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );


const getPowerQueueId = Object.freeze( ({

    queueName,
    hashedElement,

}) => {
    
    return `${ queueName }-${ hashedElement }`;
});


module.exports = Object.freeze({

    utils: Object.freeze({

        getPowerQueueId,
        getDragonDirective: require( './getDragonDirective' )
    }),
    
    constants: Object.freeze({

        ipAddressRateLimiterQueueId: streamIds.ipAddressRateLimiterQueueId,
        advancedCodeRateLimiterQueueId: streamIds.advancedCodeRateLimiterQueueId,
        dragonErrorStatusCode: 403,
        maxRateLimiterStreamLength: 200000
    }),
});
