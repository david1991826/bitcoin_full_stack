'use strict';


module.exports = ({

    isProductionMode,
    environmentVariables: {

        WALHALLA_ADDRESS_MODE_SECRET,
        EXCHANGE_TOKEN_USER_ID,
    },

}) => [

    {
        nickname: 'POST/tokens',
        name: 'api_tokens_post',
        handler: 'routes/tokens/POST/index.handler',
        pathsToInclude: [

            './routes/tokens/POST'
        ],
        environmentVariables: Object.assign(
            
            {},
            isProductionMode ? {

                MAINTENANCE_MODE_CODE: 'xyzabc',

            } : {}
        )
    },

    {
        nickname: 'GET/tokens',
        name: 'api_tokens_get',
        handler: 'routes/tokens/GET/index.handler',
        pathsToInclude: [

            './routes/tokens/GET'
        ],
        environmentVariables: {},
    },

    {
        nickname: 'PUT/tokens',
        name: 'api_tokens_put',
        handler: 'routes/tokens/PUT/index.handler',
        pathsToInclude: [
            './routes/tokens/PUT'
        ],
        environmentVariables: {},
    },

    {
        nickname: 'POST/addresses',
        name: 'api_addresses_post',
        handler: 'routes/addresses/POST/index.handler',
        pathsToInclude: [

            './routes/addresses/POST',
            './exchangeUtils'
        ],
        environmentVariables: {
            WALHALLA_ADDRESS_MODE_SECRET,
            EXCHANGE_TOKEN_USER_ID,
        }
    },

    {
        nickname: 'GET/fee-data',
        name: 'api_feeData_get',
        handler: 'routes/fee_data/GET/index.handler',
        pathsToInclude: [

            './routes/fee_data/GET'
        ],
        environmentVariables: {},
    },

    {
        nickname: 'POST/withdraws',
        name: 'api_withdraws_post',
        handler: 'routes/withdraws/POST/index.handler',
        pathsToInclude: [

            './routes/withdraws/POST'
        ],
        environmentVariables: {}
    },

    {
        nickname: 'service/cacheOnAndOffStatus',
        name: 'service_cacheOnAndOffStatus',
        handler: 'routes/ultraServices/cacheOnAndOffStatus/index.handler',
        pathsToInclude: [
            './routes/ultraServices/cacheOnAndOffStatus',
        ],
        environmentVariables: {}
    },
];
