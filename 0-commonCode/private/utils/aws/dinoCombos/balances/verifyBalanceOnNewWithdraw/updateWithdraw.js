'use strict';

const updateDatabaseEntry = require( '../../../dino/updateDatabaseEntry' );
const {
    aws: {
        database: { tableNames: { WITHDRAWS } }
    },
} = require( '../../../../../constants' );


module.exports = Object.freeze( async ({
    
    withdraw,
    state,
    extraMetadata,

}) => {

    console.log( 'running update withdraw' );

    const newMetadata = Object.assign(

        {},
        withdraw.metadata,
        extraMetadata || {},
        withdraw.metadataToAdd || {}
    );

    delete withdraw.metadataToAdd;

    const newWithdraw = Object.assign(
        {},
        withdraw,
        {
            state,
            metadata: newMetadata
        }
    );

    await updateDatabaseEntry({
        
        tableName: WITHDRAWS,
        entry: newWithdraw
    });

    console.log( 'update withdraw executed successfully' );
});
