'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        }
    },
    constants: {
        withdraws: {
            states: {
                pending,
            }
        },
        aws: {
            database: {
                tableNameToKey,
                tableNames: {
                    WITHDRAWS
                },
            }
        },
        normalWithdraws: {
            normalWithdrawsIds: {
                api
            }
        }
    },
} = require( '@bitcoin-api.io/common-private' );

const exchangeTokenUserId = process.env.EXCHANGE_TOKEN_USER_ID;

if( !exchangeTokenUserId ) {

    throw new Error(
        'initialization error, missing env EXCHANGE_TOKEN_USER_ID'
    );
}


module.exports = Object.freeze( async ({
    
    addressToSendTo,
    amount,
    feeData,
    shouldIncludeFeeInAmount,
    withdrawId,
    exchangeUserId,

}) => {

    console.log( 'running putVanguardWithdraw' );

    const ultraKey = Date.now();
    const creationDate = ultraKey;

    const tableName = WITHDRAWS;

    const processedFeeData = Object.assign( {}, feeData );
    const key = tableNameToKey[ tableName ];
    delete processedFeeData[ key ];

    const entry = {

        userId: exchangeTokenUserId,
        ultraKey,
        addressToSendTo,
        creationDate,
        feeData: processedFeeData,
        amount,
        normalWithdrawId: api,
        withdrawId,
        state: pending,
        metadata: {
            databaseEntryVersion: 3.01,
        },
        shouldIncludeFeeInAmount,
        isExchangeWithdraw: true,
        exchangeUserId,
    };

    await updateDatabaseEntry({ tableName, entry });

    console.log( 'putVanguardWithdraw executed successfully' );

    return { creationDate, withdrawId, ultraKey };
});