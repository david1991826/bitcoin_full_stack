#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../productionCredentials/depositsBot/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../stagingCredentials/depositsBot/.env`
    });
}

const runUpdateTransactionDataWorker = require(

    './runUpdateTransactionDataWorker'
);


runUpdateTransactionDataWorker();
