#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../productionCredentials/theomega/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../stagingCredentials/theomega/.env`
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

const cleanAll = Object.freeze( async ({

    collectionName,
    collection,

}) => {

    console.log(`

        Running cleanAll: ${ JSON.stringify({

            collectionName,

        }, null, 4 )}
    `);

    await mongo.remove({

        collection,
        query: {},
        justOne: false,
    });

    console.log(`

        cleanAll executed successfully: ${ JSON.stringify({

            collectionName,

        }, null, 4 )}
        
    `);
});


const cleanTheLocalDinoCache = Object.freeze( async ({

    collections

}) => {
    
    const [

        userData, addressData

     ] = await Promise.all([
         
        cleanAll({

            collectionName: collectionNames.user_data,
            collection: collections.user_data,
        }),

        cleanAll({

            collectionName: collectionNames.address_data,
            collection: collections.address_data,
        }),
    ]);

    console.log(`
    
cleanTheLocalDinoCache Results: ${ JSON.stringify({

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
        
        console.log( '🧹cleaning the local dino cache🦖' );

        await cleanTheLocalDinoCache({

            collections
        });

        disconnect();
        
        console.log( '🧽local dino cache cleaned successfully🦕' );

    } catch( err ) {

        disconnect();

        console.log( '❌here is the mega error:', err );
    }
})();