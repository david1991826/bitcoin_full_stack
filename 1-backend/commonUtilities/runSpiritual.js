'use strict';

const {
    utils: {
        delay
    }
} = require( '@bitcoin-api.io/common-private' );

const signalOnStatusToCommandCenter = require( './signalOnStatusToCommandCenter' );
const runGiraffeEvolutionProcedure = require( './runGiraffeEvolutionProcedure' );


module.exports = Object.freeze(({

    serviceName,
    spiritual,
    retryTimeInSeconds = 10,

}) => new Promise( async ( resolve, reject ) => {
        
    const runFunctionRecursion = async () => {

        try {

            await spiritual();

            await signalOnStatusToCommandCenter({

                serviceName,
            });
        
            await runGiraffeEvolutionProcedure({
        
                serviceName,
            });
        }
        catch( err ) {

            return reject( err );
        }

        console.log(

            'running ☢️🐑⚡️spirit function again in ' +
            `${ retryTimeInSeconds } seconds`
        );

        await delay( retryTimeInSeconds * 1000 );

        runFunctionRecursion();
    };

    runFunctionRecursion();
}));