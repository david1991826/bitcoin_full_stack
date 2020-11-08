'use strict';

const MongoClient = require( 'mongodb' ).MongoClient;

const url = process.env.MONGO_DB_URL;

if( !url ) {

    throw new Error( 'missing required mongo db url' );
}


module.exports = Object.freeze( ({

    collectionNames

}) => new Promise( ( resolve, reject ) => {
        
    console.log( 'connecting to mongodb' );

    const client = new MongoClient(
        
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
        
    client.connect( err => {

        if( !!err ) {

            console.log( 'an error occurred initializing mongodb' );

            if( !!client && !!client.close ) {

                client.close();
            }
    
            return reject(
                new Error( `Error in connecting to mongo: ${ err }` )
            );
        }

        const db = client.db();

        const collections = {};

        for( const collectionName of collectionNames ) {

            collections[ collectionName ] = db.collection( collectionName );
        }

        console.log( 'successfully initialized mongodb' );

        const disconnect = Object.freeze( () => {
            
            console.log( 'disconnecting from mongodb' );

            return new Promise( ( resolve, reject ) => {

                client.close( err => {

                    if( !!err ) {

                        return reject( err );
                    }

                    resolve();
                });
            });
        });
        
        resolve({

            // client,
            // db,
            collections,
            disconnect
        });
    });
}));