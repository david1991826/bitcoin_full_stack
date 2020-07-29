'use strict';

const { argv: { meta } } = require( 'yargs' );


if( !meta ) {

    module.exports = Object.freeze({

        core: require( './core' ),
        service: require( './service' ),
        // site: require( './site' ),
        exchange: require( './exchange' ),
    });
}
else {

    const jamesBondFunctions = {};

    if( meta.includes( 'e' ) ) {
    
        jamesBondFunctions.exchange = require( './exchange' );
    }
    
    // if( meta.includes( 's' ) ) {
    
    //     jamesBondFunctions.site = require( './site' );
    // }
    
    if( meta.includes( 's' ) ) {
    
        jamesBondFunctions.service = require( './service' );
    }

    if( meta.includes( 'a' ) ) {
    
        jamesBondFunctions.core = require( './core' );
    }
    
    module.exports = Object.freeze( jamesBondFunctions );
}
