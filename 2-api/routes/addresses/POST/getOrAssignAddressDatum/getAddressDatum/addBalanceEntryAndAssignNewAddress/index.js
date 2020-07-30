'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry
            },
        },
        doOperationInQueue,
        stringify
    },
    constants: {
        users: {
            balanceTypes: { bitcoinNodeIn, normalWithdraw }
        },
        aws: {
            database: {
                tableNames: { BALANCES, USERS }
            }
        },
    }
} = require( '@bitcoin-api.io/common-private' );

const {
    
    javascript: { getQueueId },

} = require( '../../../../../../utils' );

const assignAddressToUser = require( '../assignAddressToUser' );
const updateHasGottenAddressStatusForUser = require( './updateHasGottenAddressStatusForUser' );


module.exports = Object.freeze( ({

    user
    
}) => doOperationInQueue({
    
    queueId: getQueueId({ type: USERS, id: user.userId }),

    doOperation: async () => {

        console.log( 'Running addBalanceEntryAndAssignNewAddress' );

        const addressDatum = await assignAddressToUser({
            user
        });

        if( !!addressDatum ) {

            const { userId } = user;

            await updateDatabaseEntry({
        
                tableName: BALANCES,
                entry: {
    
                    userId,
                    [bitcoinNodeIn]: {},
                    [normalWithdraw]: {},
                    creationDate: Date.now(),
                }
            });
        
            await updateHasGottenAddressStatusForUser({

                userId
            });
        }

        console.log(

            'addBalanceEntryAndAssignNewAddress executed successfully - ' +
            `returning addressDatum: ${ stringify( addressDatum ) }`
        );

        return addressDatum;
    }
}));