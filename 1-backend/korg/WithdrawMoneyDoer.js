#!/usr/bin/env node
'use strict';

const argv = require( 'yargs' ).argv;

if( argv.mode === 'production' ) {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../productionCredentials/korg/.env`
    });
}
else {

    require( 'dotenv' ).config({
        path: `${ __dirname }/../stagingCredentials/korg/.env`
    });
}


const runWithdrawMoneyDoer = require( './runWithdrawMoneyDoer' );


runWithdrawMoneyDoer();