'use strict';


module.exports = Object.freeze( ({
    amount,
    state = null,
}) => ({
    amount,
    lastUpdated: Date.now(),
    state
}));