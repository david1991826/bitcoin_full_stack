'use strict';

const {
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const f = Object.freeze;

const tableNames = isProductionMode ? f({

    exchangeUsers: 'exchangeUsersv1',
    loginTokens: 'loginTokensv1',
    transactions: 'transactionsv1',

}) : f({

    exchangeUsers: 'exchangeUsersv1_staging',
    loginTokens: 'loginTokensv1_staging',
    transactions: 'transactionsv1_staging',
});


module.exports = f({
    aws: {
        database: {
            tableNames: {
                EXCHANGE_USERS: tableNames.exchangeUsers,
                LOGIN_TOKENS: tableNames.loginTokens,
                TRANSACTIONS: tableNames.transactions,
            },
            tableNameToKey: {
                [tableNames.exchangeUsers]: 'exchangeUserId',
                [tableNames.loginTokens]: 'exchangeUserId',
                [tableNames.transactions]: 'exchangeUserId',
            },
            tableNameToSortKey: {
                [tableNames.loginTokens]: 'expiryTime',
                [tableNames.transactions]: 'transactionId',
            },
            secondaryIndices: {
                emailIndex: 'email-index',
                exchangeUserIdCreationDateIndex: 'exchangeUserId-creationDate-index',
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