'use strict';

const stringify = require( '../../../../stringify' );
const doOperationInQueue = require( '../../../../doOperationInQueue' );
const removeDatabaseEntry = require( '../../../dino/removeDatabaseEntry' );
const getQueueId = require( '../../../../javascript/getQueueId' );
const getAddressDataAndIfTheAddressShouldBeReclaimed = require( './getAddressDataAndIfTheAddressShouldBeReclaimed')


const {

    aws: {
        database: {
            tableNames: { ADDRESSES },
            addressesTable: {
                unusedAddressUserId,
            }
        }
    },
    
} = require( '../../../../../constants' );

const {

    addUnusedAddressDatum

} = require( '../../../../redis/rhinoCombos' );

module.exports = Object.freeze( async ({

    address,
    noLocka = false,

}) => {
    
    console.log(
        
        `running reclaimAddress🦍: ${ stringify({

            address,
            noLocka
        })}`
    );

    const doOperation = Object.freeze( async () => {

        const {

            existingAddressDatum,
            addressShouldBeReclaimed

        } = await getAddressDataAndIfTheAddressShouldBeReclaimed({

            address
        });

        if( !addressShouldBeReclaimed ) {

            console.log(
                'reclaimAddress🦍, executed successfully - ' +
                'address does not need to be reclaimed - no op'
            );

            return;
        }

        console.log(

            'reclaimAddress🦍- address should be reclaimed - ' +
            'reclaiming address'
        );

        await removeDatabaseEntry({

            tableName: ADDRESSES,
            keyObject: {

                userId: existingAddressDatum.userId,
                address
            },
        });

        const reclamationData = existingAddressDatum.reclamationData.slice();

        const reclamationDatum = {
            
            timeOfReclamation: Date.now(),
            userId: existingAddressDatum.userId
        };

        reclamationData.push( reclamationDatum );

        const newAddressDatum = Object.assign(
            {},
            existingAddressDatum,
            {
                reclamationData,
                userId: unusedAddressUserId
            }
        );
        
        delete newAddressDatum.conversionDate;
        delete newAddressDatum.timeUntilReclamationAfterConversionDate;
        
        await addUnusedAddressDatum({

            addressDatum: newAddressDatum
        });

        console.log( `address ${ address } successfully reclaimed` );
    });

    if( noLocka ) {

        await doOperation();
    }
    else {

        console.log(
            'reclaimAddress🦍 has been invoked with the locka. ' +
            'This function will first make sure the address ' +
            'should be reclaimed before applying the locka.🔐'
        );

        // preliminary check without lock
        const answers = await getAddressDataAndIfTheAddressShouldBeReclaimed({
            address
        });
    
        if( !answers.addressShouldBeReclaimed ) {
    
            console.log(
                'running reclaimAddress🦍 executed successfully, ' +
                'address does not need to be reclaimed - no op'
            );
    
            return;
        }
    
        await doOperationInQueue({
            queueId: getQueueId({
                type: ADDRESSES,
                id: answers.existingAddressDatum.userId
            }),
            doOperation,
        });
    }

    console.log( 'reclaimAddress successfully executed🦍🍌' );
});