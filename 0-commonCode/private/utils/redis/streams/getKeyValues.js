'use strict';


module.exports = Object.freeze( ({
    
    keyValueList,
    numberKeys = []

}) => {

    const keyValues = {};

    for( let i = 0; i < keyValueList.length; i = i + 2 ) {

        const key = keyValueList[ i ];
        const value = keyValueList[ i + 1 ];

        if( numberKeys.includes( key ) ) {

            keyValues[ key ] = Number( value );
        }
        else {

            keyValues[ key ] = value;
        }
    }

    return keyValues;
});