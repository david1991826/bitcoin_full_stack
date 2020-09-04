'use strict';

const uuidv4 = require( 'uuid/v4' );

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
} = require( '@bitcoin-api/full-stack-api' );


module.exports = Object.freeze( async ({
    
    userId,
    addressToSendTo,
    amount,
    feeData,
    shouldIncludeFeeInAmount,

}) => {

    console.log( 'running putWithdrawEntry' );

    const ultraKey = Date.now();
    const creationDate = ultraKey;
    const withdrawId = uuidv4();

    const tableName = WITHDRAWS;

    const processedFeeData = Object.assign( {}, feeData );
    const key = tableNameToKey[ tableName ];
    delete processedFeeData[ key ];

    const entry = {

        userId,
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
    };

    await updateDatabaseEntry({ tableName, entry });

    console.log( 'putWithdrawEntry executed successfully' );

    return { creationDate, withdrawId, ultraKey };
});