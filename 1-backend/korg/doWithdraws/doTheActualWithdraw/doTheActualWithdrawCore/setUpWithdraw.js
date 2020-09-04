'use strict';

const {
    constants: {
        withdraws: {
            states: {
                pending,
                waiting,
            },
        },
        aws: { database: { tableNames: { WITHDRAWS } } },
        environment: {
            isProductionMode
        }
    },
    utils: {
        business: {
            getIsValidWithdrawAmount
        },
        aws: {
            dino: {
                getDatabaseEntry,
                updateDatabaseEntry
            },
        },
        stringify
    }
} = require( '@bitcoin-api.io/common-private' );
const {
    validation: {
        getIsValidAddress
    }
} = require( 'orgasm' );


module.exports = Object.freeze( async ({

    userId, ultraKey 

}) => {

    console.log( 'running setUpWithdraw' );

    const blessedWithdraw = await getDatabaseEntry({
        
        tableName: WITHDRAWS,
        value: userId,
        sortValue: ultraKey
    });

    // safeguard
    if( !blessedWithdraw || (blessedWithdraw.state !== pending) ) {

        throw new Error(
            'setUpWithdraw - ' + 
            `invalid blessed withdraw ${ stringify( blessedWithdraw ) }`
        );
    }

    await updateDatabaseEntry({

        tableName: WITHDRAWS,
        entry: Object.assign(
            {},
            blessedWithdraw,
            {
                state: waiting
            }
        )
    });

    const {

        amount,
        addressToSendTo

    } = blessedWithdraw;
    
    const theWithdrawAmountIsInvalid = !getIsValidWithdrawAmount({
 
        withdrawAmount: amount
    });

    if( theWithdrawAmountIsInvalid ) {

        throw new Error(
            'setUpWithdraw: ' +
            `invalid amount attempted to be withdrew: ${ amount }`
        );
    }
    else if( isProductionMode && !getIsValidAddress( addressToSendTo ) ) {

        throw new Error(
            'setUpWithdraw: ' +
            `invalid address specified: ${ addressToSendTo }`
        );    
    }

    const retrievedData = {

        blessedWithdraw
    };

    console.log(
        
        'setUpWithdraw executed successfully retrieved data: ' +
        stringify( retrievedData )
    );

    return retrievedData;
});
