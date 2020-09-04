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
        eventNames
    }

} = require( 'giraffe-utils' );

const f = Object.freeze;

const credentialsFolderName = isProductionMode ? (
    'productionCredentials'
) : 'stagingCredentials';
const pemPath = process.env.PEM_PATH;
const lickFileDestinationUrl = process.env.LICK_FILE_DESTINATION;
const tigerScriptDestinationPath = process.env.TIGER_SCRIPT_DESTINATION_PATH;
const zarbonSpot = process.env.ZARBON_SPOT;
const commonUtilitiesFolder = `${ zarbonSpot }/commonUtilities`;


const deployCommandToTigerSpotData = f({

    [deployCommands.feeFee]: f({
        
        tigerSpot: `${ zarbonSpot }/feeFee`,
        tigerKeySpot: (
            `${ zarbonSpot }/${ credentialsFolderName }/FeeFee/.env`
        ),
        tigerKeyFolderStructure: [
            'FeeFee',
        ],
    }),

    [deployCommands.korg]: f({
        
        tigerSpot: `${ zarbonSpot }/korg`,
        tigerKeySpot: (
            `${ zarbonSpot }/${ credentialsFolderName }/korg/.env`
        ),
        tigerKeyFolderStructure: [
            'korg',
        ],
    }),

    [deployCommands.theomega]: f({
        
        tigerSpot: `${ zarbonSpot }/theomega`,
        tigerKeySpot: (
            `${ zarbonSpot }/${ credentialsFolderName }/theomega/.env`
        ),
        tigerKeyFolderStructure: [
            'theomega',
        ],
    }),
});

const log = Object.freeze( ( ...args ) => {
    
    console.log( '😛🍁handleTongueFeel - ', ...args );
});


module.exports = Object.freeze( async ({

    information: {

        deployCommand,
        deployId,
        // eventOrder
    }

}) => {
    
    log( 'running handleTongueFeel' );

    const {

        tigerSpot,
        tigerKeySpot,
        tigerKeyFolderStructure

    } = deployCommandToTigerSpotData[ deployCommand ];

    log( 'removing node modules from:', stringify([

        tigerSpot,
        commonUtilitiesFolder
    ]) );

    await Promise.all([

        execa(

            'rm',
            [
                '-rf',
                './node_modules'
            ],
            {
                cwd: tigerSpot
            }
        ),

        execa(

            'rm',
            [
                '-rf',
                './node_modules'
            ],
            {
                cwd: commonUtilitiesFolder
            }
        ),
    ]);

    log( 'node modules successfully removed' );

    const fullDestinationUrl = (

        `${ lickFileDestinationUrl }:${ tigerScriptDestinationPath }`
    );

    const execaScpArgs = [
        '-i',
        pemPath,
        '-r',
        // commonUtilitiesFolder,
        tigerSpot,
        fullDestinationUrl
    ];

    const execaScpOptions = {};

    const fullEnvDestinationUrl = (

        `${ lickFileDestinationUrl }:` +
        `${ tigerScriptDestinationPath }/` +
        `${ credentialsFolderName }/` +
        tigerKeyFolderStructure.join( '/' ) +
        '/.env'
    );

    const execaEnvScpArgs = [
        '-i',
        pemPath,
        tigerKeySpot,
        fullEnvDestinationUrl
    ];

    const execaEnvScpOptions = {};

    log(
        `teleporting with the following values ${ stringify({

            execaScpArgs,
            execaScpOptions,

            execaEnvScpArgs,
            execaEnvScpOptions
        })}`
    );

    await Promise.all([
        execa( 'scp', execaScpArgs, execaScpOptions ),
        execa( 'scp', execaEnvScpArgs, execaEnvScpOptions ),
    ]);

    log( 'teleported successfully' );

    log( 'giraffe telepathy now' );

    await doRedisFunction({

        performFunction: ({

            redisClient

        }) => giraffeAndTreeStatusUpdate({
    
            redisClient,
            eventName: eventNames.giraffe.lickComplete,
            information: {
                deployId,
                eventOrder: 2,
                deployCommand,
            }
        }),

        functionName: 'giraffe realizes leaf feels tongue (lick complete)'
    });

    log( '🦒⚡️🧠giraffe telepathy successful' );

    log( 'handleTongueFeel executed successfully successfully' );
});
