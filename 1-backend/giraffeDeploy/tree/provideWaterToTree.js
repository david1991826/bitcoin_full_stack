'use strict';

const {

    utils: {
        delay
    },

    // constants: {
    //     redis: {
    //         streamIds
    //     }
    // }

} = require( '@bitcoin-api.io/common-private' );

const {

    listenForEventsAndExecuteActions,
    sendErrorToDeployStreamOnControlC

} = require( 'giraffe-utils' );

const waitUntilGiraffeLicksLeaf = require( './waitUntilGiraffeLicksLeaf' );
const getDoPostInitializationAction = require( './getDoPostInitializationAction' );
const getPerformActionBasedOnDeployEvent = require( './getPerformActionBasedOnDeployEvent' );

const oneSecond = 1000;
const fiveSeconds = 5 * oneSecond;


const provideWaterToTreeForever = Object.freeze( async () => {

    console.log( 'running provideWaterToTreeForever🌲' );

    const {

        deployId,
        operationExpiry,
        deployCommand,
        forceDeploy

    } = await waitUntilGiraffeLicksLeaf();

    const doPostInitializationAction = getDoPostInitializationAction({

        deployId,
        deployCommand
    });

    const performActionBasedOnDeployEvent = getPerformActionBasedOnDeployEvent({

        forceDeploy
    });

    const {
        
        anErrorOccurred

    } = await listenForEventsAndExecuteActions({

        deployId,
        operationExpiry,
        isGiraffe: '🌴',
        performActionBasedOnDeployEvent,
        doPostInitializationAction,
    });

    console.log(
        
        'provideWaterToTreeForever executed successfully🎄' +
        `running again in ${ fiveSeconds / oneSecond } seconds - ` +
        `
         💦provide water results🌴:
            an error occurred: ${ anErrorOccurred ? 'yes': 'no' }
        `
    );

    await delay( fiveSeconds );

    return await provideWaterToTreeForever();
});


module.exports = Object.freeze( async () => {

    console.log( '💦running provide water to tree🌲' );

    sendErrorToDeployStreamOnControlC({

        isGiraffe: '🌴'
    });

    try {

        await provideWaterToTreeForever();
    }
    catch( err ) {

        console.log(
            
            '⛔️💦☹️error in providing water to tree🌲:', err,
            `running again in ${ fiveSeconds / oneSecond } seconds`
        );

        await delay( fiveSeconds );

        return await provideWaterToTreeForever();
    }
});
