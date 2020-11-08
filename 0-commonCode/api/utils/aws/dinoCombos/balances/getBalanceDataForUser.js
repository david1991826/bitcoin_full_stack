'use strict';

const {

    aws: {
        database: {
            tableNames: {
                USERS,
                BALANCES
            }
        }
    }

} = require( '../../../../constants' );

const stringify = require( '../../../stringify' );
const getDatabaseEntry = require( '../../dino/getDatabaseEntry' );
const getBalance = require( '../../../business/getBalance' );


module.exports = Object.freeze( async ({

    userIdOrUser

}) => {
    
    console.log( 'running getBalanceDataForUser' );

    const user = (typeof userIdOrUser === 'string') ? (
      
        await getDatabaseEntry({

            tableName: USERS,
            value: userIdOrUser,
        })

    ) : userIdOrUser;

    if( !user.hasGottenAddress ) {

        const balance = 0;
    
        const balanceDataForUser = {

            moneyOutIsInTransformationState: false,
            balance
        };

        console.log(

            'getBalanceDataForUser exectuted successfully - ' +
            `got balance: ${ stringify({ balanceDataForUser }) } BTC - ` +
            '(default value case, user has not gotten address yet)'
        );

        return balanceDataForUser;
    }

    const balanceData = await getDatabaseEntry({

        tableName: BALANCES,
        value: user.userId,
    });

    const balanceDataForUser = getBalance({

        balanceData
    });
    
    console.log(
        'getBalanceDataForUser exectuted successfully - ' +
        `got balance: ${ stringify({ balanceDataForUser }) }`
    );

    return balanceDataForUser;
});
