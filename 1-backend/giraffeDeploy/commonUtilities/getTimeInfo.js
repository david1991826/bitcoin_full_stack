'use strict';

// NOTE: might not be necessary to be in it's own file
module.exports = Object.freeze( ({

    operationExpiry

}) => {
    
    const timeUntilExpiry = operationExpiry - Date.now();

    const thereIsTimeBeforeExpiry = (timeUntilExpiry > 0);

    return {
        
        timeUntilExpiry,
        thereIsTimeBeforeExpiry,
    };
});
