'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry,
            }
        },
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    aws: {
        database: {
            tableNames: {
                EXCHANGE_USERS,
            }
        }
    }
} = require( '../../../constants' );


module.exports = Object.freeze( async ({

    newExchangeUser,

}) => {

    console.log( 'running updateExchangeUser' );

    await updateDatabaseEntry({
        
        tableName: EXCHANGE_USERS,
        entry: newExchangeUser,
    });

    console.log( 'updateExchangeUser successfully executed' );
});
