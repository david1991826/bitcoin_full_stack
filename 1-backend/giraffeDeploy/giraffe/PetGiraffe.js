#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../productionCredentials/giraffe/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../../stagingCredentials/giraffe/.env`
    });
}


const giraffeDeploy = require( './giraffeDeploy' );


giraffeDeploy();
