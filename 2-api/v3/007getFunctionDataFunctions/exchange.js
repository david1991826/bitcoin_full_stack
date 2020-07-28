'use strict';

module.exports = ({

    // isProductionMode,
    environmentVariables: {

        IS_EXCHANGE,
        EXCHANGE_FLAMINGO_ENCRYPTION_ID,
        EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
        EXCHANGE_XOOVO_ENCRYPTION_ID,
        EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
        EXCHANGE_BITCOIN_API_TESTNET_TOKEN,
        EXCHANGE_BITCOIN_API_LIVENET_TOKEN,
        WALHALLA_ADDRESS_MODE_SECRET,
        EXCHANGE_TOKEN_USER_ID,
        EXCHANGE_SIGN_UP_GOOGLE_CAPTCHA_SECRET,
        EXCHANGE_URL,
    },

}) => { 
    
    const rawFunctionData = [

        {
            nickname: 'ePOST/users',
            name: 'e_v3_lambda_users_post',
            handler: 'routes/exchange/users/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/users/POST',
                './sacredElementals/crypto/flamingoCrescent',
            ],
            environmentVariables: {
                EXCHANGE_FLAMINGO_ENCRYPTION_ID,
                EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
                EXCHANGE_SIGN_UP_GOOGLE_CAPTCHA_SECRET,
                EXCHANGE_URL,
            }
        },

        {
            nickname: 'eGET/users/exchangeUserId',
            name: 'e_v3_lambda_users_exchange_user_id_get',
            handler: 'routes/exchange/users/exchangeUserId/GET/index.handler',
            pathsToInclude: [
                './routes/exchange/users/exchangeUserId/GET',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
            }
        },

        {
            nickname: 'eDELETE/users/exchangeUserId',
            name: 'e_v3_lambda_users_exchange_user_id_delete',
            handler: 'routes/exchange/users/exchangeUserId/DELETE/index.handler',
            pathsToInclude: [
                './routes/exchange/users/exchangeUserId/DELETE',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
            }
        },

        {
            nickname: 'ePOST/verify_user',
            name: 'e_v3_lambda_verify_user_post',
            handler: 'routes/exchange/verify_user/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/verify_user/POST',
                './sacredElementals/crypto/flamingoCrescentDecrypt',
                './sacredElementals/crypto/doLogin',
                './sacredElementals/crypto/exchangeBitcoinApi',
                './sacredElementals/crypto/xoOvo'
            ],
            environmentVariables: {
                EXCHANGE_FLAMINGO_ENCRYPTION_ID,
                EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
                EXCHANGE_BITCOIN_API_TESTNET_TOKEN,
                EXCHANGE_BITCOIN_API_LIVENET_TOKEN,
                WALHALLA_ADDRESS_MODE_SECRET,
            }
        },

        {
            nickname: 'ePOST/login',
            name: 'e_v3_lambda_login_post',
            handler: 'routes/exchange/login/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/login/POST',
                './sacredElementals/crypto/flamingoCrescentDecrypt',
                './sacredElementals/crypto/xoOvo',
                './sacredElementals/crypto/exchangeBitcoinApi',
                './sacredElementals/crypto/doLogin'
            ],
            environmentVariables: {
                EXCHANGE_FLAMINGO_ENCRYPTION_ID,
                EXCHANGE_FLAMINGO_ENCRYPTION_PASSWORD,
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
                EXCHANGE_BITCOIN_API_TESTNET_TOKEN,
                EXCHANGE_BITCOIN_API_LIVENET_TOKEN,
                WALHALLA_ADDRESS_MODE_SECRET,
            }
        },

        {
            nickname: 'ePOST/withdraws',
            name: 'e_v3_lambda_withdraws_post',
            handler: 'routes/exchange/withdraws/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/withdraws/POST',
                './sacredElementals/crypto/xoOvoDecrypt',
                './routes/withdraws/POST/withdrawMoney/getFeeData.js',
                './routes/withdraws/POST/withdrawMoney/doWithdrawMoney/getMagnaFeeData.js',
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD,
                EXCHANGE_TOKEN_USER_ID,
            },
            memory: 320,
        },

        {
            nickname: 'ePOST/logout',
            name: 'e_v3_lambda_logout_post',
            handler: 'routes/exchange/logout/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/logout/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD
            },
        },

        {
            nickname: 'ePOST/exchanges',
            name: 'e_v3_lambda_exchanges_post',
            handler: 'routes/exchange/exchanges/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/exchanges/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD
            },
        },

        {
            nickname: 'ePOST/dreams',
            name: 'e_v3_lambda_dreams_post',
            handler: 'routes/exchange/dreams/POST/index.handler',
            pathsToInclude: [
                './routes/exchange/dreams/POST',
                './sacredElementals/crypto/xoOvoDecrypt'
            ],
            environmentVariables: {
                EXCHANGE_XOOVO_ENCRYPTION_ID,
                EXCHANGE_XOOVO_ENCRYPTION_PASSWORD
            },
        },
    ];

    for( const rawFunctionDatum of rawFunctionData ) {

        rawFunctionDatum.environmentVariables.IS_EXCHANGE = IS_EXCHANGE;
        rawFunctionDatum.pathsToInclude.push( './exchangeUtils' );
    }

    return rawFunctionData;
};

