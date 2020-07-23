'use strict';

const doOperationInQueue = require( '../../../doOperationInQueue' );
const getDatabaseEntry = require( '../../dino/getDatabaseEntry' );
const updateDatabaseEntry = require( '../../dino/updateDatabaseEntry' );
const getQueueId = require( '../../../javascript/getQueueId' );

const {

    aws: { database: { tableNames: { BALANCES } } },
    users: {
        balanceTypes
    },
    normalWithdraws: {
        normalWithdrawsIds
    },
    megaServerIdToMegaServerData
    
} = require( '../../../../constants' );

const getBalanceData = require( '../../../business/getBalanceData' );

const getIfBalanceIsValid = Object.freeze(
    ({ balance }) => (

        (typeof balance === 'number') &&
        !Number.isNaN( balance ) &&
        balance >= 0
    )
);

const safeGetNewBalance = Object.freeze( ({

    existingBalanceData,
    getNewBalance

}) => {
            
    const calculatedBalance = getNewBalance({

        existingBalanceData
    });

    const newBalanceIsValid = getIfBalanceIsValid({

        balance: calculatedBalance
    });

    if( !newBalanceIsValid ) {

        throw new Error(
            'unexpected error, ' +
            'invalid balance after getNewBalance: ' +
            calculatedBalance
        );
    }

    return calculatedBalance;
});


module.exports =  Object.freeze( async ({

    userId,
    balanceType,
    balanceId,
    state = null,
    shouldDoOperationWithLock = true,

    newBalance = null,
    getNewBalance = null,

}) => {

    if( balanceType === balanceTypes.bitcoinNodeIn ) {

        if( !megaServerIdToMegaServerData[ balanceId ] ) {

            throw new Error(
                `unexpected error, invalid balance id: ${ balanceId }`
            );
        }
    }
    else if( balanceType === balanceTypes.normalWithdraw ) {

        if( !normalWithdrawsIds[ balanceId ] ) {

            throw new Error(
                `unexpected error, invalid balance id: ${ balanceId }`
            );
        }
    }
    else {

        throw new Error(
            `unexpected error, invalid balance type: ${ balanceType }`
        );
    }

    const newBalanceIsValid = getIfBalanceIsValid({

        balance: newBalance
    });

    if(
        (!newBalanceIsValid && !getNewBalance) ||
        (newBalanceIsValid && !!getNewBalance)
    ) {

        throw new Error(
            `unexpected error, invalid new balance input`
        );
    }

    console.log(
        'running updateBalance --- ' +
        `user: ${ userId }, ` +
        `balance type: ${ balanceType }, ` +
        `balance id: ${ balanceId }, ` +
        `state: ${ state }, ` +
        `shouldDoOperationWithLock: ${ shouldDoOperationWithLock }`
    );

    const doOperation = async () => {
    
        const tableName = BALANCES;
        const value = userId;

        const existingBalanceData = await getDatabaseEntry({
            tableName,
            value
        });

        const amount = !getNewBalance ? newBalance : safeGetNewBalance({

            existingBalanceData,
            getNewBalance
        })

        console.log( `new amount is: ${ amount } BTC` );

        const newBalanceData = getBalanceData({
            amount,
            state
        });

        /*
            {
                bitcoinNodeIn: {

                    abc: <new balance data>,
                    xyz: <existing balance data>,
                },

                normalWithdraw: {

                    abc: <existing balance data>,
                    xyz: <existing balance data>,
                },
            }
        */

        const newBalanceEntry = Object.assign(
            existingBalanceData,
            {
                [ balanceType ]: Object.assign(
                    
                    existingBalanceData[ balanceType ],
                    {
                        [ balanceId ]: newBalanceData,
                    }
                )
            }
        );

        await updateDatabaseEntry({
            tableName,
            entry: newBalanceEntry,
        });
    }

    if( shouldDoOperationWithLock ) {

        await doOperationInQueue({
            queueId: getQueueId({
                type: BALANCES,
                id: userId
            }),
            doOperation,
        });
    }
    else {

        await doOperation();
    }

    console.log( 'updateBalance successfully complete😄' );
});