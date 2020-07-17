'use strict';

// const {
    
//     utils: {
    
//         stringify,
//     },

// } = require( '@npm.m.stecky.efantis/commonprivate' );

const execa = require( 'execa' );

const pemPath = process.env.PEM_PATH;
const lickFileDestinationUrl = process.env.LICK_FILE_DESTINATION;
const lickFileDestinationPath = process.env.LICK_FILE_DESTINATION_PATH;


module.exports = Object.freeze( async ({
    
    pathToLickFile,
    
}) => {

    console.log( 'running sendLickFile' );

    const fullDestinationUrl = (

        `${ lickFileDestinationUrl }:${ lickFileDestinationPath }`
    );

    const execaInstance = execa(

        'scp',
        [
            '-i',
            pemPath,
            pathToLickFile,
            fullDestinationUrl
        ]
    );

    execaInstance.stdout.pipe( process.stdout );
    execaInstance.stderr.pipe( process.stderr );
    
    await execaInstance;

    console.log( 'sendLickFile executed successfully' );
});
