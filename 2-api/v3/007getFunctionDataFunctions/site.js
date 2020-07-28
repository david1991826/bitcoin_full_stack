'use strict';

module.exports = ({

    isProductionMode,
    environmentVariables: {

        WEBSITE_DO_NOT_GATHER_DATA_KEY,
        WEBSITE_DO_NOT_GATHER_DATA_SECRET,
        GOOGLE_CAPTCHA_KEY,
        BITCOIN_API_PRIVACY_POLICY_URL,
        BITCOIN_API_TERMS_OF_SERVICE_URL,
        BITCOIN_API_API_DOCUMENTATION_URL,
        CORONA_VIRUS_BITCOIN_API_IO_TOKEN,
        CORONA_VIRUS_DONATION_ADDRESS_QR_CODE_URL,
        CORONA_VIRUS_DONATION_ADDRESS,
    },

}) => { 
    
    const rawFunctionData = [

        {
            nickname: 'GET/',
            name: 'b_v3_lambda_get',
            handler: 'routes/GET/index.handler',
            pathsToInclude: [

                './routes/GET',
                './websiteUtils',
            ],
            environmentVariables: {
                WEBSITE_DO_NOT_GATHER_DATA_KEY,
                WEBSITE_DO_NOT_GATHER_DATA_SECRET,
            },
        },

        {
            nickname: 'GET/token_activator',
            name: 'b_v3_lambda_token_activator_get',
            handler: 'routes/token_activator/GET/index.handler',
            pathsToInclude: [

                './routes/token_activator/GET',
                './websiteUtils',
            ],
            environmentVariables: {

                GOOGLE_CAPTCHA_KEY
            }
        },

        {
            nickname: 'GET/privacy_policy',
            name: 'b_v3_lambda_privacy_policy_get',
            handler: 'routes/privacy_policy/GET/index.handler',
            pathsToInclude: [

                './routes/privacy_policy/GET',
                './websiteUtils',
            ],
            environmentVariables: {

                BITCOIN_API_PRIVACY_POLICY_URL
            }
        },

        {
            nickname: 'GET/terms_of_service',
            name: 'b_v3_lambda_terms_of_service_get',
            handler: 'routes/terms_of_service/GET/index.handler',
            pathsToInclude: [

                './routes/terms_of_service/GET',
                './websiteUtils',
            ],
            environmentVariables: {

                BITCOIN_API_TERMS_OF_SERVICE_URL
            }
        },

        {
            nickname: 'GET/documentation/api',
            name: 'b_v3_lambda_documentation_api_get',
            handler: 'routes/documentation/api/GET/index.handler',
            pathsToInclude: [

                './routes/documentation/api/GET',
                './websiteUtils',
            ],
            environmentVariables: {

                BITCOIN_API_API_DOCUMENTATION_URL
            }
        },

        {
            nickname: 'GET/articles/article_id',
            name: 'b_v3_lambda_articles_article_id_get',
            handler: 'routes/articles/article_id/GET/index.handler',
            pathsToInclude: [

                './routes/articles/article_id/GET',
                './websiteUtils',
                './reactWebsiteUtils',
            ],
            environmentVariables: {}
        },
    ];

    if( isProductionMode ) {

        rawFunctionData.push({

            nickname: 'GET/covid_19',
            name: 'b_v3_lambda_covid-19_get',
            handler: 'routes/covid-19/GET/index.handler',
            role: 'arn:aws:iam::164872287968:role/b_v3_lambda_covid-19_get',
            pathsToInclude: [

                './routes/covid-19/GET',
                './websiteUtils',
                './reactWebsiteUtils',
            ],
            environmentVariables: {

                CORONA_VIRUS_BITCOIN_API_IO_TOKEN,
                CORONA_VIRUS_DONATION_ADDRESS_QR_CODE_URL,
                CORONA_VIRUS_DONATION_ADDRESS,
            }
        });
    }

    return rawFunctionData;
};

