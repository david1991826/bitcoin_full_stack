'use strict';

const {
    utils: {
        aws: {
            dino: {
                getDatabaseEntry,
                updateDatabaseEntry
            },
        },
    },
    constants: {
        aws: {
            database: {
                tableNames: { USERS }
            }
        },
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze( async ({

    userId

}) => {

    console.log(
        `running updateHasGottenAddressStatusForUser for user ${ userId }`
    );
    
    const existingUserData = await getDatabaseEntry({
        value: userId,
        tableName: USERS,
    });

    if( !existingUserData ) {

        throw new Error(
            `weird error: no existing user data for user with id ${ userId }`
        );
    }

    const newUserData = Object.assign(
        {},
        existingUserData,
        {
            hasGottenAddress: true
        }
    );

    await updateDatabaseEntry({

        tableName: USERS,
        entry: newUserData
    });

    console.log(
        'updateHasGottenAddressStatusForUser ' +
        `executed successfully for user ${ userId }`
    );
});
