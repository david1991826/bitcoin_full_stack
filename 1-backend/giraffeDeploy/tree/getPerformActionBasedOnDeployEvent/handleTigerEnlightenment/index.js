'use strict';

const {

    utils: {
        stringify,
        redis: {
            doRedisFunction,
        },
    },

    constants: {
        environment: {
            isProductionMode
        }
    }

} = require( '@bitcoin-api/full-stack-api' );

const execa = require( 'execa' );

const {

    giraffeAndTreeStatusUpdate,
    constants: {
        deployCommands,
        eventNames,
    }

} = require( 'giraffe-utils' );

const performTigerEnlightenmentSpecialFunction = require(
    './performTigerEnlightenmentSpecialFunction'
);

const treeTigerSpot = process.env.TREE_TIGER_SPOT;

const log = Object.freeze( ( ...args ) => {
    
    console.log( '👅☑️handleTigerEnlightenment - ', ...args );
});

const f = Object.freeze;

const deployCommandToTigerSpotData = f({

    [deployCommands.feeDataBot]: f({
        
        tigerFolder: 'feeDataBot',
        mainFileName: 'UpdateFeeDataWorker.js',
    }),

    [deployCommands.withdrawsBot]: f({
        
        tigerFolder: 'withdrawsBot',
        mainFileName: 'WithdrawMoneyDoer.js',
    }),

    [deployCommands.theomega]: f({
        
        tigerFolder: 'theomega',
        mainFileName: 'UpdateDepositData.js',
    }),
});

const del = 'delete';
const start = 'start';


const getExecaArgs = Object.freeze( ({

    command,
    mainFileName,

}) => {

    const args = [

        command,
        mainFileName,
    ];

    if( command === del ) {

        return args;
    }

    if( isProductionMode ) {

        args.push(
            '--',
            '--mode=production'
        );
    }

    return args;
});


module.exports = Object.freeze( async ({
    information: {
        deployId,
        deployCommand,
    }
}) => {
    
    log( `running handleTigerEnlightenment - ${ stringify({

        deployCommand
        
    })}` );

    const {

        tigerFolder,
        mainFileName

    } = deployCommandToTigerSpotData[ deployCommand ];

    const trueTigerPath = `${ treeTigerSpot }/${ tigerFolder }`;

    log( 'pm2 stopping then starting:', stringify([

        trueTigerPath,
        mainFileName
    ]) );

    try {

        await execa(

            'pm2',
            getExecaArgs({
                command: del,
                mainFileName
            }),
            {
                cwd: trueTigerPath
            }
        );
    }
    catch( err ) {

        log( 'error in stopping pm2 instance:', err );
    }

    await performTigerEnlightenmentSpecialFunction({

        deployCommand,
        log
    });

    await execa(

        'pm2',
        getExecaArgs({
            command: start,
            mainFileName
        }),
        {
            cwd: trueTigerPath
        }
    );

    const aMessage = eventNames.leaf.serviceIsGood;

    log(
        'successfully stopped and started the ' +
        'further enlightened tiger🌊🐅 ' +
        `now creating a message ${ aMessage } for everyone💌`
    );

    await doRedisFunction({

        performFunction: ({

            redisClient

        }) => giraffeAndTreeStatusUpdate({
    
            redisClient,
            eventName: aMessage,
            information: {
                deployId,
                eventOrder: 5,
                deployCommand,
            }
        }),

        functionName: '🌲tree engages with summoned tiger telepathically🐅'
    });

    log(
        `successfully sent message ${ aMessage } for everyone💌`
    );

    log( '🐅💁‍♀️handleTigerEnlightenment executed successfully' );
});
