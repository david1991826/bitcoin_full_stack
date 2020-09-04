'use strict';

const {
    withdraws: { states }
} = require( '../../constants' );

const stringify = require( '../stringify' );

const { formatting: { getAmountNumber } } = require( 'orgasm' );


const getMoneyIn = Object.freeze( ({

    balanceData

}) => {

    // Source: bitcoin node in
    const bitcoinNodeInBalanceIdToBalanceData = (
        balanceData.bitcoinNodeIn
    ) || {};

    const totalAmountIn = Object.values(
        
        bitcoinNodeInBalanceIdToBalanceData
    
    ).map( ({ amount }) => amount ).reduce(
    
        (amountA, amountB) => amountA + amountB, 0
    );

    return totalAmountIn;
});


const getMoneyOutData = Object.freeze( ({

    balanceData

}) => {
    
    // Source: normal withdraw
    const bitcoinNormalWithdrawBalanceIdToBalanceData = (
        balanceData.normalWithdraw
    ) || {};

    let moneyOutIsInTransformationState = false;

    const totalAmountOut = Object.values(
        
        bitcoinNormalWithdrawBalanceIdToBalanceData
    
    ).map( ({ amount, state }) => {

        if( state === states.complete ) {

            return amount;
        }
        else if(
            [
                states.pending,
                states.verifying

            ].includes( state )
        ) {

            moneyOutIsInTransformationState = true;

            return amount;
        }

        return 0;

    }).reduce(
    
        (amountA, amountB) => amountA + amountB, 0
    );

    return {
        moneyOut: totalAmountOut,
        moneyOutIsInTransformationState
    };
});


module.exports = Object.freeze( ({

    balanceData

}) => {

    console.log(
        `running getBalance with balance data: ${ stringify( balanceData ) }`
    );

    const moneyIn = getMoneyIn({ balanceData });

    const {
        
        moneyOut,
        moneyOutIsInTransformationState

    } = getMoneyOutData({ balanceData });

    const balance = getAmountNumber( moneyIn - moneyOut );

    console.log(
        `getBalance executed successfully, here are the results: ` +
        `${ stringify({

            moneyIn,
            moneyOut,
            balance,
            ['🐲']: '🐉',
            moneyOutIsInTransformationState
        }) }`
    );

    return {

        moneyOutIsInTransformationState,
        balance
    };
});