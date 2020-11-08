'use strict';

const stringify = require( '../../stringify' );
const doRedisRequest = require( '../doRedisRequest' );
const jsonEncoder = require( '../../javascript/jsonEncoder' );
const {
    redis: {
        streamIds
    }
} = require( '../../../constants' );


module.exports = Object.freeze( async ({

    redisClient,
    eventName,
    information

}) => {

    console.log(
        '🦒🌲💁‍♀️⏫',
        'running giraffeAndTreeStatusUpdate with the following values:',
        stringify({
            eventName,
            information,
        })
    );

    const formattedInformation = Object.assign(

        {},
        {
            time: Date.now(),
        },
        information
    );

    const powerInformation = jsonEncoder.encodeJson( formattedInformation );

    const redisArguments = [
        streamIds.zarbonDeploy,
        'MAXLEN',
        '~',
        1000,
        '*',
        'eventName',
        eventName,
        'information',
        powerInformation
    ];

    const operationStartTimeKey = await doRedisRequest({

        client: redisClient,
        command: 'xadd',
        redisArguments,
    });

    const results = {

        operationStartTimeKey
    };

    console.log(
        '🦒🌲💁‍♀️⏫',
        'giraffeAndTreeStatusUpdate executed successfully - ' +
        `returning results ${ stringify({ results }) }`
    );

    return results;
});
