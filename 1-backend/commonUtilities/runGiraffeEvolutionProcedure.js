'use strict';

const {
    constants: {
        redis: {
            streamIds
        },
        deploy: {
            eventNames
        }
    },
    utils: {
        redis: {
            doRedisFunction,
            doRedisRequest,
            rhinoCombos: {
                giraffeAndTreeStatusUpdate
            },
            streams,
        },
        stringify,
        javascript: {
            jsonEncoder
        },
    }
} = require( '@bitcoin-api/full-stack-api' );


const getGetIfTigerShouldHideResults = Object.freeze(({

    tigerShouldHide = false,
    deployCommand = null,
    deployId = null,
    eventOrder = null,

} = {

    tigerShouldHide: false,
    deployCommand: null,
    deployId: null,
    eventOrder: null,

}) => ({

    tigerShouldHide,
    deployCommand,
    deployId,
    eventOrder,
}));


const getIfTigerShouldHide = Object.freeze( async ({

    serviceName

}) => doRedisFunction({

    performFunction: async ({

        redisClient

    }) => {

        console.log(
            '🐅🏞running getIfTigerShouldHide - ' +
            stringify({
                serviceName
            })
        );
        
        const readStartTime = Date.now() - (5 * 60 * 1000);

        const deployEventRawDataResults = await doRedisRequest({

            client: redisClient,
            command: 'xread',
            redisArguments: [

                'STREAMS',
                streamIds.zarbonDeploy,
                readStartTime
            ],
        });

        const deployEventRawData = (
    
            !!deployEventRawDataResults &&
            !!deployEventRawDataResults[0] &&
            !!deployEventRawDataResults[0][1] &&
            deployEventRawDataResults[0][1]

        ) || [];

        const theLastDeployEventRawData = deployEventRawData[

            deployEventRawData.length - 1

        ] || null;

        if( !theLastDeployEventRawData ) {

            console.log(
                '🐅🏞getIfTigerShouldHide - executed successfully - ' +
                'no deploy event data (no-op)'
            );

            return getGetIfTigerShouldHideResults();
        }

        const theLastDeployEventData = {

            timeKey: theLastDeployEventRawData[0],
            keyValues: streams.getKeyValues({
                keyValueList: theLastDeployEventRawData[1],
            }),
        };

        const {
            // timeKey,
            keyValues,
        } = theLastDeployEventData;

        const eventName = keyValues.eventName;

        const information = jsonEncoder.decodeJson(
            keyValues.information
        );

        const eventOrder = Number( information.eventOrder );

        if(
            (eventName === eventNames.leaf.tigerCommand) &&
            (information.deployCommand === serviceName) &&
            !Number.isNaN( eventOrder ) && 
            !!information.deployId &&
            !information.forceDeploy
        ) {

            const values = {

                tigerShouldHide: true,
                deployId: information.deployId,
                deployCommand: information.deployCommand,
                eventOrder,
            };

            console.log(
                '🐅🏞getIfTigerShouldHide - executed successfully - ' +
                `the tiger should hide - ${ stringify( values ) }`
            );

            return getGetIfTigerShouldHideResults( values );
        }

        console.log(
            '🐅🏞getIfTigerShouldHide - executed successfully - ' +
            'no relevant deploy event data (no-op)'
        );

        return getGetIfTigerShouldHideResults();
    },

    functionName: (
        'seeing if tiger should hide for improvement based on ' +
        'spiritual enlightenment'
    )
}));


module.exports = Object.freeze( async ({

    serviceName,

}) => {

    console.log(
        '🦒💁‍♀️running runGiraffeEvolutionProcedure: ' +
        stringify({ serviceName })
    );

    const {
        
        tigerShouldHide,
        deployCommand,
        deployId,
        eventOrder

    } = await getIfTigerShouldHide({

        serviceName
    });

    if( !tigerShouldHide ) {

        console.log(
            '🦒💁‍♀️runGiraffeEvolutionProcedure executed successfully - ' +
            'tiger does not need to hide'
        );

        return;
    }

    console.log(
        '🦒💁‍♀️runGiraffeEvolutionProcedure - ' +
        'enlightening the tiger💡🐅'
    );

    await doRedisFunction({

        performFunction: ({
    
            redisClient
    
        }) => giraffeAndTreeStatusUpdate({

            redisClient,
            eventName: eventNames.tiger.tigerEnlightenment,
            information: {
                deployId,
                deployCommand,
                eventOrder: eventOrder + 1,
            }
        }),

        functionName: (
            'informing everyone of the tiger wave of consciousness'
        ),
    });

    console.log(
        '🦒💁‍♀️runGiraffeEvolutionProcedure executed successfully - ' +
        'tiger will be hidden for enlightenment'
    );

    await new Promise( () => {

        setInterval( () => {

            console.log( 'The unknown zone👾' );

        }, 3 * 60 * 1000 );
    });
});
