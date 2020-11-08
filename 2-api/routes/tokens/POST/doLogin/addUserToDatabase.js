'use strict';

const {
    // constants: {
        // users: {
        //     balanceTypes: { bitcoinNodeIn, normalWithdraw }
        // }
    // },
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry
            }
        }
    }
} = require( '@bitcoin-api/full-stack-api' );


const {
    
    stringify,
    constants: {
        aws: { database: { tableNames: { USERS/*, BALANCES */ } } }
    }

} = require( '../../../../utils' );


module.exports = Object.freeze( async ({

    userId,
    accessCode,
    metadata,
    encryptionId

}) => {
    
    const userDatabaseEntry = {
        userId,
        accessCode,
        metadata,
        hasGottenAddress: false,
        encryptionId,
    };

    // const balanceDatabaseEntry = {
    //     userId,
    //     [bitcoinNodeIn]: {},
    //     [normalWithdraw]: {},
    //     creationDate: Date.now(),
    // };

    console.log(
        
        `running addUserToDatabase with the following values: ${ stringify({
            userId,
            accessCode: accessCode.length,
        })}`
        // , also adding corresponding address data: ${ stringify({
        //     balanceDatabaseEntry
        // })}`
    );

    const createUserValues = {

        tableName: USERS,
        entry: userDatabaseEntry
    };

    // const createBalanceValues = {

    //     tableName: BALANCES,
    //     entry: balanceDatabaseEntry,
    // };

    await Promise.all([
        updateDatabaseEntry( createUserValues ),
        // updateDatabaseEntry( createBalanceValues ),
    ]);

    console.log(
        
        'addUserToDatabase successfully executed ' +
        `for user: ${ stringify( userId ) }`
    );
});