'use strict';

const {

    utils: {
        stringify,
    },

} = require( '@bitcoin-api/full-stack-api' );

const {

    constants: {
        deployCommands,
    }

} = require( 'giraffe-utils' );

const depositsBotSpecialTigerFunction = require( './depositsBotSpecialTigerFunction' );

const f = Object.freeze;

const deployCommandToSpecialTigerFunctionData = f({

    [deployCommands.feeDataBot]: f({}),

    [deployCommands.withdrawsBot]: f({}),

    [deployCommands.depositsBot]: f({

        specialTigerFunction: depositsBotSpecialTigerFunction
    }),
});


module.exports = Object.freeze( async ({
    
    deployCommand,
    log,

}) => {
    
    log( `🐯🌈🍁running performTigerEnlightenmentSpecialFunction -
    
        ${ stringify({

            deployCommand
            
        })}
    `
    );

    const {

        specialTigerFunction = async () => {},

    } = deployCommandToSpecialTigerFunctionData[ deployCommand ];

    await specialTigerFunction({

        log
    });

    log(
        
        '🐯🌈🍁performTigerEnlightenmentSpecialFunction executed successfully'
    );
});
