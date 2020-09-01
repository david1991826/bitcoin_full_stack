'use strict';

const {
    utils: {
        redis: {
            rhinoCombos: {
                giraffeAndTreeStatusUpdate
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api' );


module.exports = Object.freeze({

    giraffeAndTreeStatusUpdate,
    constants: require( './constants' ),
    listenForEventsAndExecuteActions: require( './listenForEventsAndExecuteActions' ),
    getTimeInfo: require( './getTimeInfo' ),
    sendErrorToDeployStreamOnControlC: require( './sendErrorToDeployStreamOnControlC' ),
});