#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../productionCredentials/tree/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../stagingCredentials/tree/.env`
    });
}


const provideWaterToTree = require( './provideWaterToTree' );


provideWaterToTree();
