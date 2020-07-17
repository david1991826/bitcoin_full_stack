'use strict';

const getServiceNameStreamKey = Object.freeze( ({

    megaServerId,
    serviceName

}) => {
    
    if( !megaServerId || !serviceName ) {

        throw new Error( 'getServiceNameStreamKey: missing stream key value' );
    }

    return `${ megaServerId }-${ serviceName }`;
});


const decodeServiceNameStreamKey = Object.freeze( ({

    serviceNameStreamKey

}) => {

    const [ megaServerId, serviceName ] = serviceNameStreamKey.split( '-' );
    
    return {

        megaServerId,
        serviceName
    };
});


module.exports = Object.freeze({

    getServiceNameStreamKey,
    decodeServiceNameStreamKey
});
