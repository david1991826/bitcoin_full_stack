'use strict';


const encodeJson = Object.freeze( json => {
    
    const encodedJson = (
        Buffer.from( JSON.stringify( json ) ).toString( 'base64' )
    );

    return encodedJson;
});


const decodeJson = Object.freeze( encodedJson => {
    
    const json = JSON.parse(
        Buffer.from( encodedJson, 'base64' ).toString( 'ascii' )
    );

    return json;
});


module.exports = Object.freeze({
    
    encodeJson,
    decodeJson
});
