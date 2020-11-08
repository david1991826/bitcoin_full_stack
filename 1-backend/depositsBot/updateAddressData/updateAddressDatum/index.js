'use strict';

const getAddressDatum = require( './getAddressDatum' );
const updateAddressAmount = require( './updateAddressAmount' );

const {
    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api' );

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser
            }
        }
    },
    constants: {
        transactions: {
            types
        }
    }
} = require( '@bitcoin-api/full-stack-exchange' );

const {
    mongo,
    backgroundExecutor,
} = require( '@bitcoin-api/full-stack-backend' );


const getAddressCacheObject = Object.freeze( ({

    isLegacy = false,
    legacyData = null,
    lastUpdateData = null,
    
}) => ({
    
    isLegacy,
    legacyData,
    lastUpdateData,
}));


const addCacheValue = Object.freeze( async ({

    mongoCollections,
    isLegacy,
    legacyData,
    lastUpdateData,
    address

}) => {

    const params = {};

    if( !!isLegacy ) {

        params.isLegacy = isLegacy;
    }

    if( !!lastUpdateData ) {

        params.lastUpdateData = lastUpdateData;
    }

    if( !!legacyData ) {

        params.legacyData = legacyData;
    }
    
    await mongo.update({

        collection: mongoCollections.address_data,
        query: {
            
            address,
        },
        newValue: {
         
            $set: getAddressCacheObject( params )
        },
    });
});


const addAddressToLegacyCache = Object.freeze( async ({

    address,
    amount,
    mongoCollections,
    
}) => {
    
    console.log(
                
        'running addAddressToLegacyCache: ' +
        `adding address ${ address } as ` +
        'legacy address to cache'
    );

    await addCacheValue({
        address,
        mongoCollections,
        isLegacy: true,
        legacyData: {

            amount
        }
    });

    console.log(

        'addAddressToLegacyCache: ' +
        '💾legacy or unused address with money found in ' +
        'bitcoin node, not processing it - '  +
        'addAddressToLegacyCache executed successfully'
    );
});


const updateAddressDinoAndAddToCache = Object.freeze( async ({

    address,
    amount,
    existingAddressDatum,
    mongoCollections,

}) => {
    
    const { userId } = existingAddressDatum;
            
    await updateAddressAmount({

        userId,
        address,
        amount,
    });

    console.log(    
        `adding address ${ address } - last update data - to cache`
    );

    await addCacheValue({
        address,
        mongoCollections,
        lastUpdateData: {
            amount,
            userId
        }
    });

    const isExchangeUserAddress = (
      
        !!existingAddressDatum.isExchangeAddress &&
        !!existingAddressDatum.exchangeUserId
    );

    if( isExchangeUserAddress ) {

        console.log(
            `address ${ address } is an exchange user address - ` +
            'adding add bitcoin transaction'
        );

        backgroundExecutor.addOperation({
        
            operation: async () => {
    
                await addTransactionAndUpdateExchangeUser({

                    exchangeUserId: existingAddressDatum.exchangeUserId,
                    type: types.addBitcoin,
                    data: {
                        address,
                        amount
                    }
                });
            }
        });
    }
});


const updateUserIdToBitcoinNodeAmountIn = Object.freeze( ({

    userId,
    amount,
    userIdToBitcoinNodeAmountIn

}) => {
    
    userIdToBitcoinNodeAmountIn[ userId ] = (
                        
        userIdToBitcoinNodeAmountIn[ userId ] || 0
    );

    userIdToBitcoinNodeAmountIn[ userId ] += amount;
});


const cachedAddressDatumStatuses = Object.freeze({
    
    storyUntold: 'storyUntold',
    unchangedLegacy: 'unchangedLegacy',
    improvedLegacy: 'improvedLegacy',
    sameFresh: 'sameFresh',
    improvedFresh: 'improvedFresh',
});


const getCacheStatus = Object.freeze( ({

    canonicalAddressDatum,
    cachedAddressDatum

}) => {

    const { address } = canonicalAddressDatum;

    console.log(
        'getting cache status using the following info: ' +
        stringify({
            
            ['the address']: address,
            ['cached address datum']: (
                cachedAddressDatum || 'no cached address datum'
            ),
            ['canonical address datum']: canonicalAddressDatum
        })
    );

    if( !cachedAddressDatum ) {

        return cachedAddressDatumStatuses.storyUntold;
    }
    else if( cachedAddressDatum.isLegacy ) {

        if(
            cachedAddressDatum.legacyData.amount ===
            canonicalAddressDatum.amount
        ) {

            return cachedAddressDatumStatuses.unchangedLegacy;
        }

        return cachedAddressDatumStatuses.improvedLegacy;
    }
    else if(
        !!cachedAddressDatum.lastUpdateData &&
        (
            cachedAddressDatum.lastUpdateData.amount ===
            canonicalAddressDatum.amount
        ) &&
        !!cachedAddressDatum.lastUpdateData.userId // safeguard
    ) {

        return cachedAddressDatumStatuses.sameFresh;
    }

    return cachedAddressDatumStatuses.improvedFresh;
});


const getCacheInfo = Object.freeze( async ({

    canonicalAddressDatum,
    mongoCollections

}) => {

    console.log( 'running getCacheInfo' );

    const {

        address,
        // amount
        
    } = canonicalAddressDatum;

    const cachedAddressDatum = (
        
        await mongo.search({

            collection: mongoCollections.address_data,
            query: {

                address,
            },
            queryOptions: {

                limit: 1,
            }
        })
        
    )[0];

    const cacheStatus = getCacheStatus({

        canonicalAddressDatum,
        cachedAddressDatum
    });

    const cacheInfo = {

        cacheStatus,
        cachedAddressDatum
    };

    console.log(
        'getCacheInfo executed successfully, got cache info:',
        stringify( cacheInfo )
    );

    return cacheInfo;
});


// NOTE: add helpers and stories for modularization
const updateAddressDatum = Object.freeze( async ({
    
    canonicalAddressDatum,
    mongoCollections,
    userIdToBitcoinNodeAmountIn
    
}) => {

    console.log(
        'running updateAddressDatum ' +
        `with the following values: ${ stringify({

            canonicalAddressDatum,
        }) }`
    );

    console.log(
        'updateAddressDatum: ' +
        'if necessary, updating the following address data with ' +
        `the following values: ${ stringify( canonicalAddressDatum ) }`
    );

    const {

        address,
        amount
        
    } = canonicalAddressDatum;

    const {

        cacheStatus,
        cachedAddressDatum

    } = await getCacheInfo({

        canonicalAddressDatum,
        mongoCollections
    });

    if( cacheStatus === cachedAddressDatumStatuses.storyUntold ) {

        const existingAddressDatum = await getAddressDatum({
        
            address
        });

        if( !existingAddressDatum ) {

            console.log(
                '🦉updateAddressDatum: ' +
                '🦉legacy address not in cache case - ' +
                'adding legacy address to cache'
            );

            await addAddressToLegacyCache({

                address,
                mongoCollections,
                amount,
            });

            return console.log(
                'updateAddressDatum ' +
                `executed successfully - ${ address } - 🦉`
            );
        }

        const { userId } = existingAddressDatum;

        // const addressShouldBeReclaimed = getIfAddressShouldBeReclaimed({

        //     addressDatum: existingAddressDatum
        // });

        // if( addressShouldBeReclaimed ) {

        //     console.log(
                
        //         `🐞address ${ address } should be reclaimed🐞 - ` +
        //         'removing the dino ' +
        //         'entry and adding to legacy cache'
        //     );

        //     await removeDatabaseEntry({

        //         tableName: ADDRESSES,
        //         keyObject: {

        //             userId,
        //             address,
        //         }
        //     });
        
        //     await addAddressToLegacyCache({

        //         address,
        //         mongoCollections,
        //         amount,
        //     });
            
        //     return console.log(
        //         'updateAddressDatum ' +
        //         `executed successfully - ${ address } - 🐞`
        //     );
        // }

        console.log(
            '🐺updateAddressDatum: ' +
            '🐺live address not in cache case - '+
            'updating amount and adding to cache'
        );

        await updateAddressDinoAndAddToCache({

            address,
            amount,
            existingAddressDatum,
            mongoCollections,
        });

        updateUserIdToBitcoinNodeAmountIn({

            userId,
            amount,
            userIdToBitcoinNodeAmountIn
        });

        return console.log(
            'updateAddressDatum ' +
            `executed successfully - ${ address } - 🐺`
        );
    }
    else if( cacheStatus === cachedAddressDatumStatuses.unchangedLegacy ) {

        console.log(

            '📞cache call📞 - ' +
            'updateAddressDatum: ' +
            '💾legacy or unused address with money found in ' +
            'bitcoin node, not processing it - ' +
            `address: ${ address }`
        );

        return console.log(
            'updateAddressDatum ' +
            `executed successfully - ${ address } - 📞`
        );
    }
    else if( cacheStatus === cachedAddressDatumStatuses.improvedLegacy ) {
        // NOTE: case - reclaimed address and next address owner added money

        console.log(
            '♞♘addAddressToLegacyCache♘♞ ' +
            'an improved legacy ♘♞- ' +
            'amount in legacy address increased, ' +
            'removing cache value and running updateAddressDatum again'
        );

        await mongo.remove({

            collection: mongoCollections.address_data,
            query: {
    
                address,
            },
        });

        console.log(
            'updateAddressDatum ' +
            `executed successfully (running again) - ${ address } - ♘♞`
        );
        
        return await updateAddressDatum({
    
            canonicalAddressDatum,
            mongoCollections,
            userIdToBitcoinNodeAmountIn
        });
    }
    else if( cacheStatus === cachedAddressDatumStatuses.sameFresh ) {

        console.log(
            '🐲updateAddressDatum: ' +
            '🐲live address already in cache with same amount'
        );

        updateUserIdToBitcoinNodeAmountIn({

            userId: cachedAddressDatum.lastUpdateData.userId,
            amount,
            userIdToBitcoinNodeAmountIn
        });

        console.log(
            'updateAddressDatum: ' +
            `address ${ address } is already up-to-date - no-op`
        );

        return console.log(
            'updateAddressDatum ' +
            `executed successfully - ${ address } - 🐲`
        );
    }
    else if( cacheStatus === cachedAddressDatumStatuses.improvedFresh ) {
            
        console.log(
            '🐸updateAddressData: ' +
            `🐸updating live address ${ address } with new amount ` +
            amount +
            ' - the case is updating an address ' +
            'that already existed in cache'
        );
    
        const existingAddressDatum = await getAddressDatum({
    
            address
        });
    
        await updateAddressDinoAndAddToCache({
    
            address,
            amount,
            existingAddressDatum,
            mongoCollections,
        });
    
        updateUserIdToBitcoinNodeAmountIn({
    
            userId: existingAddressDatum.userId,
            amount,
            userIdToBitcoinNodeAmountIn
        });
    
        return console.log(
            'updateAddressDatum ' +
            `executed successfully - ${ address } -  🐸`
        );
    }
            
    throw new Error(
        `weird error, unexpected cache status: ${ cacheStatus }`
    );
});


module.exports = updateAddressDatum;