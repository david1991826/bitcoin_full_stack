'use strict';

const {
    constants: {
        aws: {
            database: {
                tableNames: { ADDRESSES },
            }
        },
        redis: {
            listIds
        }
    },
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
        redis: {
            getClient,
            doRedisRequest
        },
        stringify,
        javascript: {
            jsonEncoder: {
                decodeJson
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api' );

// const oneHundredDays = (100 * 24 * 60 * 60 * 1000);


const assignAddressToUser = Object.freeze( async ({

    user,

}) => {
     
    console.log( 'running assignAddressToUser' );

    const client = getClient();
    
    try {
        
        const rawUnusedAddressData = await doRedisRequest({

            client,
            command: 'rpop',
            redisArguments: [
                listIds.unusedAddressData
            ],
        });

        client.quit();

        if( !rawUnusedAddressData ) {

            console.log(
                'assignAddressToUser executed successfully, ' +
                'no fresh addresses found, ' +
                'returning null instead of an address'
            );

            return null; 
        }

        const unusedAddressData = decodeJson( rawUnusedAddressData );

        if( unusedAddressData.amount > 0 ) {
            // note: safeguard

            console.log(
                'Weird case: ' +
                'assignAddressToUser - ' +
                'unusedAddressData is actually used, ' +
                'trying again to find another clean address. ' +
                `address data ${ stringify( unusedAddressData ) } ` +
                'will be disregarded'
            );
                
            return await assignAddressToUser({

                user
            });
        }

        const newAddressDatum = Object.assign(
            {},
            unusedAddressData,
            {
                userId: user.userId,
                conversionDate: Date.now(),
                // timeUntilReclamationAfterConversionDate: oneHundredDays,
            }
        );

        await updateDatabaseEntry({

            tableName: ADDRESSES,
            entry: newAddressDatum,
        });

        console.log(
            'assignAddressToUser executed successfully, ' +
            `assigned new address: ${ newAddressDatum.address }`
        );

        return newAddressDatum;
    }
    catch( err ) {
        
        try {
            
            client.quit();
        }
        catch( redisQuitErr ) {

            console.log(
                
                'an redis quit error occurred in assignAddressToUser:',
                redisQuitErr
            );
        }
        
        console.log( 'an error occurred in assignAddressToUser:', err );

        throw err;
    }
});


module.exports = assignAddressToUser;