'use strict';

module.exports = Object.freeze(
    
    timeout => new Promise( resolve => setTimeout( resolve, timeout ) )
);
