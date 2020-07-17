'use strict';

const {

    utils: {
        stringify
    },

} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    constants: {
        aws: {
            database: {
                tableNames: { EXCHANGE_USERS }
            }
        },
    }
} = require( '@npm.m.stecky.efantis/common-exchange' );

const {
    aws: {
        dino: {
            getExchangeDatabaseEntry
        }
    },
    exchangeUsers: {
        getBalanceData
    }
} = require( '../../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    // event,
    exchangeUserId,

}) => {

    console.log(
        
        `running getUser with the following values: ${
            stringify({

                exchangeUserId,
            })
        }`
    );

    const exchangeUser = await getExchangeDatabaseEntry({
        
        value: exchangeUserId,
        tableName: EXCHANGE_USERS,
    });

    if( !exchangeUser.email ) {
        // safeguard - shouldn't be possible anyways

        const error = new Error( 'cannot get user without verified email' );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    const getUserResults = {

        userId: exchangeUserId,
        email: exchangeUser.email,
        balanceData: getBalanceData({

            exchangeUser,
        }),
    };

    console.log(
        
        `getUser executed successfully, returning the results: ${
            stringify( getUserResults )
        }`
    );

    return getUserResults;
});