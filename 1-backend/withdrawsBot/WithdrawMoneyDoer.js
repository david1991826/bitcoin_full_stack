#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../productionCredentials/withdrawsBot/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../stagingCredentials/withdrawsBot/.env`
    });
}


const runWithdrawMoneyDoer = require( './runWithdrawMoneyDoer' );


runWithdrawMoneyDoer();