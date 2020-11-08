#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../productionCredentials/feeDataBot/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../stagingCredentials/feeDataBot/.env`
    });
}


const runUpdateFeeDataWorker = require( './runUpdateFeeDataWorker' );


runUpdateFeeDataWorker();
