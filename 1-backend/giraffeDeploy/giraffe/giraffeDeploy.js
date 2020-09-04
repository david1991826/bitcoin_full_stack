'use strict';

const { argv } = require( 'yargs' );

const {

    listenForEventsAndExecuteActions,
    sendErrorToDeployStreamOnControlC
    // constants: {
    //     deployCommands,
    //     deployCommandList
    // }

} = require( 'giraffe-utils' );

const getDeployCommand = require( './getDeployCommand' );
const getDoPostInitializationAction = require( './getDoPostInitializationAction' );
const performActionBasedOnDeployEvent = require( './performActionBasedOnDeployEvent' );

const timeUntilExpiry = 15 * 60 * 1000;


const giraffeDeployCore = Object.freeze( async () => {

    console.log( 'running giraffeDeployCore' );

    const operationTime = Date.now();
    const deployId = `zarbonDeploy${ operationTime }`;
    const operationExpiry = operationTime + timeUntilExpiry;
    const deployCommand = getDeployCommand();
    const forceDeploy = !!argv.force;

    const doPostInitializationAction = getDoPostInitializationAction({

        deployId,
        operationTime,
        operationExpiry,
        deployCommand,
        forceDeploy
    });

    const {
        
        anErrorOccurred
        
    } = await listenForEventsAndExecuteActions({

        deployId,
        operationExpiry,
        doPostInitializationAction,
        performActionBasedOnDeployEvent,
    });

    if( anErrorOccurred ) {

        throw new Error( 'an error occurred in giraffeDeployCore' );
    }

    console.log( 'giraffeDeployCore executed successfully🦒' );
});


module.exports = Object.freeze( async () => {

    console.log( '🦒running giraffe deploy🦒' );

    sendErrorToDeployStreamOnControlC({

        isGiraffe: '🦒'
    });

    try {

        await giraffeDeployCore();

        console.log( '🦒giraffe deploy executed successfully🦒' );
    }
    catch( err ) {

        console.log( '🦒error in giraffe deploy🦒:', err );
    }
});