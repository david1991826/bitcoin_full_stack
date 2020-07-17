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
            name: 'b_v3_lambda_service_cache_on_and_off_status',
            handler: 'routes/ultraServices/cacheOnAndOffStatus/index.handler',
            role: 'arn:aws:iam::164872287968:role/b_v3_lambda_cache_on_or_off_status',
            pathsToInclude: [
                './routes/ultraServices/cacheOnAndOffStatus',
            ],
            environmentVariables: {}
        },

        {
            nickname: 'service:makeSureApiIsActive',
            name: 'b_v3_lambda_service_make_sure_api_is_active',
            handler: 'routes/ultraServices/makeSureApiIsActive/index.handler',
            role: 'arn:aws:iam::164872287968:role/b_v3_lambda_service_make_sure_api_is_active',
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

