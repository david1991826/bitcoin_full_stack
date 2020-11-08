'use strict';


module.exports = Object.freeze( ({ min, max }) => {

    const ceilingMinimum = Math.ceil( min );
    const floorMaximum = Math.floor( max );
    
    const randomIntegerInclusive = Math.floor(
        
        Math.random() *
        (floorMaximum - ceilingMinimum + 1)
        
    ) + ceilingMinimum;

    return randomIntegerInclusive;
});