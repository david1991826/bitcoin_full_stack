'use strict';

const {
    utils: {
        // doOperationInQueue,
        // javascript: { getQueueId },
        aws: {
            dino: {
                getDatabaseEntry,
                updateDatabaseEntry,
            },
        },
        stringify
    },
    constants: {
        aws: {
            database: {
                tableNames: { ADDRESSES },
            }
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

// idempotent
module.exports = Object.freeze( async ({

    userId,
    address,
    amount,
    
    // TODO: remove lock, unnecessary
}) => {
// {
//     doOperationInQueue({

//     queueId: getQueueId({
//         type: ADDRESSES,
//         id: userId
//     }),

//     doOperation: async () => 

    console.log(
        'running updateAddressAmount with the following values ' +
        stringify({
            userId,
            address,
            amount
        })
    );

    const existingAddressDataFresh = await getDatabaseEntry({

        tableName: ADDRESSES,
        value: userId,
        sortValue: address
    });

    // safeguard
    if( !existingAddressDataFresh ) {

        console.log(
            'weird case, attempting to update address that has ' +
            'been (most likely) reclaimed - no-op'
        );

        return;
    }

    const newAddressData = Object.assign(
        {},
        existingAddressDataFresh,
        {
            amount
        }
    );

    await updateDatabaseEntry({

        tableName: ADDRESSES,
        entry: newAddressData
    });

    console.log( 'updateAddressAmount executed successfully' );
});

