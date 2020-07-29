'use strict';

module.exports = ({

    // isProductionMode,
    environmentVariables: {

        WEBSITE_DO_NOT_GATHER_DATA_KEY,
        WEBSITE_DO_NOT_GATHER_DATA_SECRET,
        BITCOIN_API_TOKEN_FOR_MONITORING_TESTS,
    },

}) => { 
    
    const rawFunctionData = [

        {
            nickname: 'service:cacheOnAndOffStatus',
            name: 'service_cacheOnAndOffStatus',
            handler: 'routes/ultraServices/cacheOnAndOffStatus/index.handler',
            pathsToInclude: [
                './routes/ultraServices/cacheOnAndOffStatus',
            ],
            environmentVariables: {}
        },

        {
            nickname: 'service:makeSureApiIsActive',
            name: 'service_makeSureApiIsActive',
            handler: 'routes/ultraServices/makeSureApiIsActive/index.handler',
            pathsToInclude: [
                './routes/ultraServices/makeSureApiIsActive',
            ],
            environmentVariables: {
                BITCOIN_API_TOKEN_FOR_MONITORING_TESTS,
                WEBSITE_DO_NOT_GATHER_DATA_KEY,
                WEBSITE_DO_NOT_GATHER_DATA_SECRET,
            },
            timeout: 60
        },
    ];

    return rawFunctionData;
};

