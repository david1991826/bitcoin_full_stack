'use strict';

const {
    utils: {
        redis: {
            rhinoCombos: {
                giraffeAndTreeStatusUpdate
            }
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze({

    giraffeAndTreeStatusUpdate,
    constants: require( './constants' ),
    listenForEventsAndExecuteActions: require( './listenForEventsAndExecuteActions' ),
    getTimeInfo: require( './getTimeInfo' ),
    sendErrorToDeployStreamOnControlC: require( './sendErrorToDeployStreamOnControlC' ),
});