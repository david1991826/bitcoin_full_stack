'use strict';

const execa = require( 'execa' );

const {
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@bitcoin-api.io/common-private' );


module.exports = Object.freeze(({

    args

}) => {

    const envObject = {};

    const formattedArgs = isProductionMode ? args : (

        [ '-testnet' ].concat( args )
    );

    return execa(

        'bitcoin-cli',
        formattedArgs,
        {
            env: envObject,
            // extendEnv: false
            // cwd: BITCOIN_DAEMON_PATH
        }

    ).then( response => {

        if(
            !response ||
            response.failed ||
            response.timedOut ||
            response.isCanceled ||
            response.killed ||
            (Number(response.exitCode) !== 0)
        ) {

            const errorMessage = (

                'error in doBitcoinRequest, '+
                'using the following args: ' +
                JSON.stringify( formattedArgs ) +
                ', error: ' +
                JSON.stringify( response )
            );

            console.log( errorMessage );

            throw response;
        }

        return response.stdout;
    });
});