#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../credentials/theomega/production/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../credentials/theomega/staging/.env`
    });
}

const {

    mongo,
    constants: {
        mongo: {
            collectionNames
        }
    }

} = require( '@bitcoin-api.io/backend-common-utilities' );

const limit = 10;
const oneGreaterThanTheLimit = limit + 1;

const getAll = Object.freeze( async ({

    collectionName,
    collection,
    allData = [],
    iterationCount = 0,

}) => {

    console.log(`

        Running getAll: ${ JSON.stringify({

            collectionName,
            ['number of gotten entries']: allData.length,
            iterationCount,
        }, null, 4 )}
    `);
    
    const skip = allData.length;

    const collectedData = await mongo.search({

        collection,
        query: {},
        queryOptions: {

            limit: oneGreaterThanTheLimit,
            skip
        },
    });

    const thereAreMore = collectedData.length >= oneGreaterThanTheLimit;

    const formattedCollectedData = collectedData.slice(
        0,
        thereAreMore ? (collectedData.length - 1) : collectedData.length
    );

    allData.push( ...formattedCollectedData );

    if( collectedData.length < oneGreaterThanTheLimit ) {

        console.log(`

            getAll executed successfully: ${ JSON.stringify({

                collectionName,
                ['number of gotten entries']: allData.length,
                iterationCount,
            }, null, 4 )}
        `);

        return allData;
    }

    return await getAll({

        collectionName,
        collection,
        allData,
        iterationCount: iterationCount + 1 
    });
});


const searchTheLocalDinoCache = Object.freeze( async ({

    collections

}) => {
    
    const [

        userData, addressData

     ] = await Promise.all([
         
        getAll({

            collectionName: collectionNames.user_data,
            collection: collections.user_data,
        }),

        getAll({

            collectionName: collectionNames.address_data,
            collection: collections.address_data,
        }),
    ]);

    console.log(`
    
    
    
        MEGA LOG: ${ JSON.stringify({

            userData,
            addressData

        }, null, 4 ) }
    
    
    
    `);
});


(async () => {

    const {

        collections,
        disconnect
        
    } = await mongo.connect({
        
        collectionNames: [

            collectionNames.address_data,
            collectionNames.user_data,
        ]
    });

    try {
        
        console.log( '🔎searching the local dino cache🦖' );

        await searchTheLocalDinoCache({

            collections
        });

        disconnect();
        
        console.log( '🛩🌍local dino cache cleaned successfully🦕' );

    } catch( err ) {

        disconnect();

        console.log( '❌here is the mega error:', err );
    }
})();