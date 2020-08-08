'use strict';

const execa = require( 'execa' );

const isLivenetMode = (process.env.BITCOIN_REQUEST_MODE === 'livenet');


module.exports = Object.freeze(({

    command,
    livenet = isLivenetMode

}) => {

    if( typeof command === 'string' ) {

        command = [ command ];
    }

    const envObject = {};

    const formattedCommand = livenet ? command : (

        [ '-testnet' ].concat( command )
    );

    return execa(

        'bitcoin-cli',
        formattedCommand,
        {
            env: envObject,
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

                'error in bitcoin-request, '+
                'using the following args: ' +
                JSON.stringify( formattedCommand ) +
                ', error: ' +
                JSON.stringify( response )
            );

            console.log( errorMessage );

            throw response;
        }

        return response.stdout;
    });
});