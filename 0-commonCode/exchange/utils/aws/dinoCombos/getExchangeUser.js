'use strict';

const {
    utils: {
        stringify,
    },
} = require( '@bitcoin-api/full-stack-api' );

const {
    aws: {
        database: {
            tableNames: {
                EXCHANGE_USERS,
            }
        }
    }
} = require( '../../../constants' );

const getExchangeDatabaseEntry = require( '../dino/getExchangeDatabaseEntry' );


module.exports = Object.freeze( async ({

    exchangeUserId,

}) => {

    console.log(
        
        'running getExchangeUser ' +
        `with the following values: ${ stringify({

            exchangeUserId,
        }) }`
    );

    const exchangeUser = await getExchangeDatabaseEntry({
        
        tableName: EXCHANGE_USERS,
        value: exchangeUserId,
    });

    console.log(
        
        'getExchangeUser successfully executed, got exchange user: ' +
        stringify( exchangeUser )
    );

    return exchangeUser;
});
