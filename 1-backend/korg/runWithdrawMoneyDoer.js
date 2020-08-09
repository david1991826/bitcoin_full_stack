'use strict';

const {

    runSpiritual

} = require( '@bitcoin-api.io/backend-common-utilities' );

const {
    constants: {
        computerServerServiceNames: {
            monkeyPaw     
        }
    }
} = require( '@bitcoin-api.io/common-private' );

const {

    backgroundExecutor

} = require( './utils' );

// const oneSecond = 1000;
// const tenSeconds = 10 * oneSecond;
// let lastOnStatusSignal = 0;

const getPendingWithdrawData = require( './getPendingWithdrawData' );

const doWithdraws = require( './doWithdraws' );

const serviceName = monkeyPaw;


// const withdrawBitcoinsForever = Object.freeze( async ({

//     iterationCount = 1,

// } = { iterationCount: 1 }) => {

//     console.log(
//         '***** Running withdrawBitcoinsForever *****\n' +
//         `🐉🐉The Count: ${ iterationCount }🐉🐉`
//     );

//     const timeSinceLastOnSignal = (Date.now() - lastOnStatusSignal);

//     if( timeSinceLastOnSignal > tenSeconds ) {

//         await signalOnStatusToCommandCenter({

//             serviceName,
//         });
//     }

//     await runGiraffeEvolutionProcedure({

//         serviceName,
//     });

//     const pendingWithdrawData = await getPendingWithdrawData();

//     const {
        
//         unexpectedError = null,

//     } = (
        
//         (
        
//             await doWithdraws({ pendingWithdrawData })

//         ) ||

//         {
//             unexpectedError: null
//         }
//     );

//     if( !!unexpectedError ) {

//         console.error(

//             'An unexpected error occurred in withdrawBitcoinsForever:',
//             unexpectedError
//         );

//         console.log( 'ending withdrawBitcoinsForever, forever' );

//         await new Promise( () => {

//             console.log( 'WithdrawMoneyDoer is dead💀' );
//         });
//     }

//     const retryTime = tenSeconds;

//     console.log(

//         'withdrawBitcoinsForever executed successfully, ' +
//         `running again in ${ retryTime / 1000 } seconds`
//     );

//     await bluebird.delay( retryTime );

//     return await withdrawBitcoinsForever({

//         iterationCount: (iterationCount + 1) % 10000000,
//     });
// });


const spiritual = Object.freeze( async () => {

    console.log(
        '***** Running withdrawBitcoins ***** 🐉🐉🐉🐉'
    );

    const pendingWithdrawData = await getPendingWithdrawData();

    const {
        
        unexpectedError = null,

    } = (
        
        (
        
            await doWithdraws({ pendingWithdrawData })

        ) ||

        {
            unexpectedError: null
        }
    );

    if( !!unexpectedError ) {

        console.error(

            'An unexpected error occurred in withdrawBitcoins:',
            unexpectedError
        );

        console.log( 'ending withdrawBitcoins, forever' );

        await new Promise( () => {

            console.log( 'WithdrawMoneyDoer is dead💀' );
        });
    }

    console.log(

        'withdrawBitcoins executed successfully, 🐉🐉🐉🐉🔥🔥🔥🔥'
    );
});


module.exports = Object.freeze( async () => {

    try {

        backgroundExecutor.start();

        await runSpiritual({

            serviceName,
            spiritual,
        });
    }
    catch( err ) {

        const errorMessage = (
            `error in withdrawBitcoinsForever: ${ err }`
        );

        console.error( errorMessage );
        console.error( err.stack );
    }
});
