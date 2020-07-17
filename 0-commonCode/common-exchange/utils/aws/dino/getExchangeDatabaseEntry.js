'use strict';

const {
    utils: {
        aws: {
            dino: {
                getDatabaseEntry,
            },
        },
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    aws: {
        database: {
            tableNameToKey,
            tableNameToSortKey
        }
    },
} = require( '../../../constants' );


module.exports = Object.freeze( async ({

    tableName,
    value,

}) => {

    const key = tableNameToKey[ tableName ];

    const params = {

        tableName,
        value,
        key,
    };

    const sortKey = tableNameToSortKey[ tableName ];

    if( !!sortKey ) {

        params.sortKey = sortKey;
    }

    const databaseEntry = await getDatabaseEntry( params );

    return databaseEntry;
});