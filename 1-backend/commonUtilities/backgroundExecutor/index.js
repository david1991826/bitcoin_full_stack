'use strict';

const EventEmitter = require( 'events' );

const getStart = require( './getStart' );

const getAddOperation = require( './getAddOperation' );

const eventEmitter = new EventEmitter();


module.exports = Object.freeze({

    start: getStart({

        eventEmitter,
    }),

    addOperation: getAddOperation({

        eventEmitter,
    })
});