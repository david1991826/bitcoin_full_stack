'use strict';

module.exports = Object.freeze(
    
    ({ operationTimeKey }) => Number( operationTimeKey.split( '-' )[ 0 ] )
);
