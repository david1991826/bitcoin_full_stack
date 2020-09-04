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

const theomegaSpecialTigerFunction = require( './theomegaSpecialTigerFunction' );

const f = Object.freeze;

const deployCommandToSpecialTigerFunctionData = f({

    [deployCommands.feeFee]: f({}),

    [deployCommands.korg]: f({}),

    [deployCommands.theomega]: f({

        specialTigerFunction: theomegaSpecialTigerFunction
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
