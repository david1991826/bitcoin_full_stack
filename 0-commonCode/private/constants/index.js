'use strict';

const {
    constants: { withdraws }
} = require( 'general-common' );

const staging = 'staging';
const production = 'production';

const validBitcoinApiEnvs = Object.freeze([

    staging,
    production
]);

const bitcoinApiEnv = process.env.BITCOIN_API_ENV;

if( !validBitcoinApiEnvs.includes( bitcoinApiEnv ) ) {

    throw new Error(
        `invalid process.env.BITCOIN_API_ENV: ${ bitcoinApiEnv }`
    );
}

const isProductionMode = (bitcoinApiEnv === production);

console.log(
    
    `intializing constants in production mode: ${ isProductionMode }\n` +
    `location: ${ __dirname }`
);

const tableNames = isProductionMode ? Object.freeze({

    users: 'usersv1',
    addresses: 'addressesv1',
    metadata: 'metadatav1',
    withdraws: 'withdrawsv1',
    balances: 'balancesv1',
    unusedAddresses: 'unused_addressesv1',

}) : Object.freeze({

    users: 'usersv1_staging',
    addresses: 'addressesv1_staging',
    metadata: 'metadatav1_staging',
    withdraws: 'withdrawsv1_staging',
    balances: 'balancesv1_staging',
    unusedAddresses: 'unused_addressesv1_staging',
});

const f = Object.freeze;


module.exports = f({
    aws: {
        database: {
            tableNames: {
                USERS: tableNames.users,
                ADDRESSES: tableNames.addresses,
                METADATA: tableNames.metadata,
                WITHDRAWS: tableNames.withdraws,
                BALANCES: tableNames.balances,
                UNUSED_ADDRESSES: tableNames.unusedAddresses,
            },
            tableNameToKey: {
                [tableNames.users]: 'userId',
                [tableNames.addresses]: 'userId',
                [tableNames.metadata]: 'key',
                [tableNames.withdraws]: 'userId',
                [tableNames.balances]: 'userId',
                [tableNames.unusedAddresses]: 'creationDate'
            },
            tableNameToSortKey: {
                [tableNames.addresses]: 'address',
                [tableNames.withdraws]: 'ultraKey',
            },
            metadataPartitionKeyValues: {
                feeData: 'fee',
                onAndOffSwitch: 'onAndOffSwitch',
            },
            addressesTable: {
                unusedAddressUserId: 'babebabe-babe-4bae-babe-babebabebabe',
                secondaryIndexNames: {
                    addressIndex: 'address-index',
                }
            },
            secondaryIndex: {
                depositsIndex: 'userId-timeReceived-index',
                stateCreationDateIndex: 'state-creationDate-index',
            }
        },
        storage: {
            classicalS3Storage: 'classicalS3Storage'
        }
    },
    MEGA_SEPARATOR: '__THE_SEPARATOR__',
    users: {
        USER_ID_LENGTH: 32,
        databasePropertyNames: {
            balanceTypeToBalanceIdToBalanceData: (
                'balanceTypeToBalanceIdToBalanceData'
            ),
        },
        balanceTypes: {
            bitcoinNodeIn: 'bitcoinNodeIn',
            normalWithdraw: 'normalWithdraw',
        },
    },

    withdraws,

    normalWithdraws: {
        normalWithdrawsIds: {
            api: 'api'
        },
    },

    megaServerIdToMegaServerData: f({

        computer_server_1: f({

            url: 'https://computer_server.ngrok.io',
        }),

        // computer_server_2: f({

        //     url: 'https://sex.ngrok.io',
        // }),
    }),

    errorCodes: {
        operationTimeOutError: (
            'ERRORCODESOTOE2eb456e22bed4f67778288888990edaa'
        ),
    },

    computerServerServiceNames: {

        monkeyPaw: 'monkeyPaw',
        juiceCamel: 'juiceCamel',
        refreshingDrank: 'refreshingDrank',
    },

    redis: {
        streamIds: {
            q: 'q',
            ipAddressRateLimiterQueueId: 'ipAddressRateLimiterQueueId',
            advancedCodeRateLimiterQueueId: 'advancedCodeRateLimiterQueueId',
            bankStatusQueueId: 'bankStatusQueueId',
            websiteIpAddressDatav1: 'websiteIpAddressDatav1',
            giraffeToTreeDeploy: 'giraffeToTreeDeploy',
            zarbonDeploy: 'zarbonDeploy',
        },
        listIds: {
            unusedAddressData: 'unusedAddressData'
        },
        keys: {
            cacheOnAndOffStatus: 'cacheOnAndOffStatus'
        }
    },

    deploy: {
        eventNames: {
            leaf: {
                tigerCommand: 'tigerCommand'
            },
            tiger: {
                tigerEnlightenment: 'tigerEnlightenment'
            }
        }
    },

    environment: {
        bitcoinApiEnv,
        isProductionMode
    }
});