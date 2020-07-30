'use strict';

module.exports = (
// {
//     {
//          isProductionMode,
//          environmentVariables: {
//     },
// }
) => { 
    
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
    ];

    return rawFunctionData;
};

