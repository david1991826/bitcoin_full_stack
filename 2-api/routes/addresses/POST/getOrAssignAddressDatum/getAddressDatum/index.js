'use strict';

const {
    utils: {
        doOperationInQueue,
        stringify,
        // aws: {
            // dinoCombos: {
                // addresses: {
                //     reclaimAddress
                // }
            // },
        // },
        // database: {
            // addresses: {
            //     getIfAddressShouldBeReclaimed
            // }
        // }
    },
    constants: {
        aws: {
            database: {
                tableNames: { ADDRESSES }
            }
        },
    }
} = require( '@bitcoin-api.io/common-private' );

const {
    
    javascript: { getQueueId },

} = require( '../../../../../utils' );

const addBalanceEntryAndAssignNewAddress = require( './addBalanceEntryAndAssignNewAddress' );
const getUnusedAddressDatum = require( './getUnusedAddressDatum' );
const assignAddressToUser = require( './assignAddressToUser' );


module.exports = Object.freeze( async ({

    user,
    
}) => doOperationInQueue({
        
    queueId: getQueueId({ type: ADDRESSES, id: user.userId }),
    
    doOperation: async () => {
            
        const { userId } = user;

        console.log(
            `running getAddressDatum ${ stringify({
                userId
            }) }`
        );

        if( !user.hasGottenAddress ) {

            const newAddressDatum = await addBalanceEntryAndAssignNewAddress({

                user,
            });

            console.log(                
                'getAddressDatum executed successfully ' +
                `returning ${ stringify({ newAddressDatum }) }`
            );

            return newAddressDatum;
        }

        const unusedAddressDatum = await getUnusedAddressDatum({

            user,
        });

        if( !!unusedAddressDatum ) {

            console.log( 'unused address exists for user case' );

            // const addressShouldBeReclaimed = getIfAddressShouldBeReclaimed({

            //     addressDatum: unusedAddressDatum
            // });

            // if( addressShouldBeReclaimed ) {

            //     console.log(
            //         'unused address has expired! ' +
            //         'Reclaiming the address.'
            //     );

            //     await reclaimAddress({

            //         address: unusedAddressDatum.address,
            //         noLocka: true,
            //     });
            // }
            // else {

                console.log(          
                    'getAddressDatum executed successfully ' +
                    `returning ${ stringify({ unusedAddressDatum }) }`
                );

                return unusedAddressDatum;
            // }
        }
        
        const newAddressDatum = await assignAddressToUser({

            user,
        });

        console.log(
            'getAddressDatum executed successfully ' +
            `returning ${ stringify({ newAddressDatum }) }`
        );

        return newAddressDatum;
    }
}));