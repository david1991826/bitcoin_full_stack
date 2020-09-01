'use strict';

const {

    constants: {
        environment: {
            isProductionMode
        }
    }

} = require( '@bitcoin-api/full-stack-api' );

const execa = require( 'execa' );

const treeTigerSpot = process.env.TREE_TIGER_SPOT;


module.exports = Object.freeze( async ({

    log,

}) => {

    log( 'running theomegaSpecialTigerFunction' );

    const localDatabaseCacheCleanScriptPath = (

        `${ treeTigerSpot }/theomega/scripts`
    );

    log(
        
        'cleaning local cache databases at using script at path ' +
        `"${ localDatabaseCacheCleanScriptPath }"`
    );

    const commandArgs = [
     
        'cleanTheLocalDinoCache.js'
    ];

    if( isProductionMode ) {

        commandArgs.push(
            '--mode=production'
        );
    }
    else {

        commandArgs.push(
            '--mode=staging'
        );
    }

    const execaInstance = execa(

        'node',
        commandArgs,
        {
            cwd: localDatabaseCacheCleanScriptPath
        }
    );

    execaInstance.stdout.pipe(process.stdout);
    execaInstance.stderr.pipe(process.stderr);
    
    await execaInstance;

    log(
        'theomegaSpecialTigerFunction executed successfully - ' +
        'cache database successfully cleaned'
    );
});

