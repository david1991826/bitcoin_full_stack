'use strict';

const bluebird = require( 'bluebird' );

const {
    utils: {
        aws: {
            dinoCombos: {
                balances: {
                    updateBalance
                }
            }
        },
        stringify
    },
    constants: {
        users: {
            balanceTypes: {
                bitcoinNodeIn
            }
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    mongo,
} = require( 'common-utilities' );

const {
    constants: {
        megaServerId
    },
} = require( 'common-utilities' );


module.exports = Object.freeze( async ({

    userIdToBitcoinNodeAmountIn,
    mongoCollections

}) => {

    const userIds = Object.keys( userIdToBitcoinNodeAmountIn );

    console.log(`

        running updateUserBalanceData, YES🐺
        updating ${ userIds.length } users
    `);

    await bluebird.map( userIds, async userId => {

        const newBalance = userIdToBitcoinNodeAmountIn[ userId ];

        const cachedUserData = (
            await mongo.search({

                collection: mongoCollections.user_data,
                query: {
                    userId,
                },
                queryOptions: {
                    limit: 1,
                }
            })
        )[0];

        if(
            !!cachedUserData &&
            (cachedUserData.lastUpdateBalance === newBalance)
        ) {

            return console.log(`

                cache value the same for user: ${ userId }

                no update required
            `);
        }

        await updateBalance({

            userId,
            balanceType: bitcoinNodeIn,
            balanceId: megaServerId,
            newBalance,
        });

        const userData = {
         
            lastUpdateBalance: newBalance
        };

        console.log(
            `adding user_data to cache: ${ stringify( userData )}`
        );

        await mongo.update({

            collection: mongoCollections.user_data,
            query: {
                userId,
            },
            newValue: {
                
                $set: userData
            }
        });

    }, { concurrency: 3 });

    console.log(`

        updateUserBalanceData exeucted successfully, YES BABY🌹🌹🌹!!

        updated ${ userIds.length } users
    `);
});
