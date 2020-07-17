#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../productionCredentials/theomega/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../stagingCredentials/theomega/.env`
    });
}

const runUpdateTransactionDataWorker = require(

    './runUpdateTransactionDataWorker'
);


runUpdateTransactionDataWorker();
