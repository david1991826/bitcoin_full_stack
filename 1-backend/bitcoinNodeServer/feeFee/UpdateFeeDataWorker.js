#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../productionCredentials/FeeFee/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../stagingCredentials/FeeFee/.env`
    });
}


const runUpdateFeeDataWorker = require( './runUpdateFeeDataWorker' );


runUpdateFeeDataWorker();
