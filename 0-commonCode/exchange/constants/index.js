'use strict';

const {
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@bitcoin-api.io/common-private' );

const f = Object.freeze;

const tableNames = isProductionMode ? f({

    exchangeUsers: 'bitcoin_api_exchangeUsers',
    loginTokens: 'bitcoin_api_loginTokens',
    transactions: 'bitcoin_api_transactions',
    exchangeEmailDeliveryResults: 'bitcoin_api_exchangeEmailDeliveryResults',

}) : f({

    exchangeUsers: 'bitcoin_api_exchangeUsers_staging',
    loginTokens: 'bitcoin_api_loginTokens_staging',
    transactions: 'bitcoin_api_transactions_staging',
    exchangeEmailDeliveryResults: 'bitcoin_api_exchangeEmailDeliveryResults_staging',
});


module.exports = f({
    aws: {
        database: {
            tableNames: {
                EXCHANGE_USERS: tableNames.exchangeUsers,
                LOGIN_TOKENS: tableNames.loginTokens,
                TRANSACTIONS: tableNames.transactions,
                EXCHANGE_EMAIL_DELIVERY_RESULTS: tableNames.exchangeEmailDeliveryResults,
            },
            tableNameToKey: {
                [tableNames.exchangeUsers]: 'exchangeUserId',
                [tableNames.loginTokens]: 'exchangeUserId',
                [tableNames.transactions]: 'exchangeUserId',
                [tableNames.exchangeEmailDeliveryResults]: 'email',
            },
            tableNameToSortKey: {
                [tableNames.loginTokens]: 'expiryTime',
                [tableNames.transactions]: 'transactionId',
                [tableNames.exchangeEmailDeliveryResults]: 'creationDate',
            },
            secondaryIndices: {
                emailIndex: 'email-index',
                exchangeUserIdCreationDateIndex: 'exchangeUserId-creationDate-index'
            }
        },
    },

    transactions: {
        types: {
            addBitcoin: 'addBitcoin',
            withdrawBitcoin: 'withdrawBitcoin',
            exchange: 'exchange',
            dream: 'dream',
        },

        bitcoinWithdrawTypes: {

            start: 'start',
            failed: 'failed',
            success: 'success',
        },
    },

    withdraws: {

        states: {
            no_withdraws_are_currently_being_processed: 'no_withdraws_are_currently_being_processed',
            withdraw_is_being_processed: 'withdraw_is_being_processed',
        }
    },

    exchanges: {
        bounds: {
            crypto: {
                max: 69000,
                min: 0.00001,
            },
            bitcoin: {
                max: 69,
                min: 0.00000001,
            }
        },

        rates: {

            cryptoOverBTC: 1000,
        },

        types: {

            btcToCrypto: 'btcToCrypto',
            cryptoToBTC: 'cryptoToBTC'
        }
    },

    dreams: {
        types: {
            coin: 'coin',
        }
    }
});