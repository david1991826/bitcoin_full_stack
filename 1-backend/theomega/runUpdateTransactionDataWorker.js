'use strict';

const {
    runSpiritual,
    mongo,
    constants: {
        mongo: {
            collectionNames
        }
    }
} = require( 'common-utilities' );

const {
    constants: {
        computerServerServiceNames: {
            juiceCamel     
        }
    }
} = require( '@bitcoin-api.io/common-private' );

const {

    backgroundExecutor

} = require( 'common-utilities' );

const getCanonicalAddressData = require( './getCanonicalAddressData' );
const updateAddressData = require( './updateAddressData' );
const updateUserBalanceData = require( './updateUserBalanceData' );
const serviceName = juiceCamel;


const getSpiritual = Object.freeze( ({

    mongoConnectResults,

}) => Object.freeze( async () => {

    console.log(
        '***** Running updateTransactionData *****🐉🐉🐉🐉'
    );

    const mongoCollections = mongoConnectResults.collections;

    const canonicalAddressData = await getCanonicalAddressData();

    const {

        userIdToBitcoinNodeAmountIn

    } = await updateAddressData({
        
        canonicalAddressData,
        mongoCollections
    });

    await updateUserBalanceData({

        userIdToBitcoinNodeAmountIn,
        mongoCollections
    });

    console.log(
        '***** updateTransactionData ' +
        'executed successfully *****🐉🐉🐉🐉🔥🔥🔥🔥'
    );
}));


module.exports = Object.freeze( async () => {

    try {

        backgroundExecutor.start();

        const mongoConnectResults = await mongo.connect({
            collectionNames: [
    
                collectionNames.address_data,
                collectionNames.user_data,
            ]
        });

        const spiritual = getSpiritual({

            mongoConnectResults
        });

        await runSpiritual({

            spiritual,
            serviceName,
        });
    }
    catch( err ) {

        const errorMessage = (
            `error in bitcoin runUpdateTransactionDataWorker: ${ err }`
        );

        console.error( errorMessage );
        console.error( err.stack );
    }
});