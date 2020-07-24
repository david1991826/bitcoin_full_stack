#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../productionCredentials/calzoneSun/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../stagingCredentials/calzoneSun/.env`
    });
}

const {
    doBitcoinRequest,
    constants: {
        megaServerId
    }
} = require( 'common-utilities' );

const {
    validation: {
        getIsValidAddress
    }
} = require( 'orgasm' );

const {
    utils: {
        redis: {
            rhinoCombos: {
                addUnusedAddressDatum
            }
        },
    },
    constants: {
        aws: {
            database: {
                addressesTable: { unusedAddressUserId }               
            },
        },
        environment: {
            isProductionMode,
        },
    },

} = require( '@bitcoin-api.io/common-private' );

const args = Object.freeze([ 'getnewaddress' ]);

const createQrPicture = require( './createQrPicture' );
const addQrCodePictureToS3 = require( './addQrCodePictureToS3' );

const argumentAsNumber = Number( process.argv[ 2 ] );

const numberOfAddressesToAdd = (

    Number.isInteger( argumentAsNumber ) && ( argumentAsNumber >= 1 )
    
) ? argumentAsNumber : 1;


const addAddressToDatabase = Object.freeze( async () => {

    const address = await doBitcoinRequest({ args });

    if(
        isProductionMode &&
        !getIsValidAddress( address )
    ) {

        throw new Error(
            
            'invalid bitcoin address received from ' +
            `doBitcoinRequest with args: ${ JSON.stringify( args ) }`
        );
    }

    await createQrPicture({ address });
    const qrCodeData = await addQrCodePictureToS3({ address });

    console.log( `🐫Updating database with new address: ${ address }` );

    const thePowerOfNow = Date.now();

    const addressDatum = {

        address,
        qrCodeData,

        creationDate: thePowerOfNow,
        lastUpdated: thePowerOfNow,

        megaServerId,
        amount: 0,

        userId: unusedAddressUserId,

        reclamationData: [],
    };

    await addUnusedAddressDatum({ addressDatum });

    console.log( `🐫New address: ${ address } added to database🐪🦂🌵` );
});


(async () => {

    try {

        for( let i = 1; i <= numberOfAddressesToAdd; i++ ) {

            await addAddressToDatabase();
            await new Promise( resolve => setTimeout( resolve, 1000 ) );
        }
    }
    catch( err ) {

        console.log( 'mega error:', err );
    }
})();
