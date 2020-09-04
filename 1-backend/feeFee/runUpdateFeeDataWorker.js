'use strict';

const {

    // signalOnStatusToCommandCenter,
    // runGiraffeEvolutionProcedure,
    runSpiritual

} = require( '@bitcoin-api.io/backend-common-utilities' );

const {
    constants: {
        computerServerServiceNames: {
            refreshingDrank     
        }
    }
} = require( '@bitcoin-api.io/common-private' );

const updateFee = require( './updateFee' );

const NORMAL_RETRY_TIME_IN_SECONDS = 10;

const serviceName = refreshingDrank;


// const updateFeeData = Object.freeze( async () => {

//     console.log( 'Running updateFeeData' );

//     await updateFee();

//     console.log(

//         'updateFeeData executed successfully'
//     );
// });


// const runFunction = () => new Promise( async ( resolve, reject ) => {
        
//     const runFunctionRecursion = async () => {

//         try {

//             await updateFeeData();
//         }
//         catch( err ) {

//             return reject( err );
//         }

//         console.log(

//             `running again in ${ NORMAL_RETRY_TIME_IN_SECONDS } seconds`
//         );

//         await b.delay( NORMAL_RETRY_TIME_IN_SECONDS * 1000 );

//         runFunctionRecursion();
//     };

//     runFunctionRecursion();
// });


const runUpdateFeeDataWorker = Object.freeze( () => {

    return runSpiritual({

        spiritual: updateFee,
        retryTimeInSeconds: NORMAL_RETRY_TIME_IN_SECONDS,
        serviceName,
        
    }).catch( err => {

        const errorMessage = (

            `error in bitcoin runUpdateFeeDataWorker: ${ err }`
        );

        console.error( errorMessage );
        console.error( err.stack );
    });
});


module.exports = runUpdateFeeDataWorker;
