'use strict';

const {
    utils: {
        stringify
    },
} = require( '@bitcoin-api/full-stack-api' );

const {
    transactions: {
        types,
        // bitcoinWithdrawTypes,
    }
} = require( '../../../../constants' );


module.exports = Object.freeze( ({

    theOracleOfDelphiDefi,
    transactionToAdd,
    exchangeUser,

}) => {

    console.log(
        '🐐☢️🤙running oracleCallback: ' +
        stringify({

            theOracleOfDelphiDefi,
            transactionToAdd,
        })
    );

    if( transactionToAdd.type === types.addBitcoin ) {
        
        const bitcoinData = (
            
            exchangeUser &&
            exchangeUser.moneyData &&
            exchangeUser.moneyData.bitcoin
        );

        const currentAddressAmount = bitcoinData.filter(

            ({ address }) => ( address === transactionToAdd.address )

        )[0].amount;

        const amountBasedOnAddBitcoinTransactions = theOracleOfDelphiDefi[ 
            types.addBitcoin
        ].addressToData[
            transactionToAdd.address
        ].amount;

        if(
            currentAddressAmount !==
            amountBasedOnAddBitcoinTransactions
        ) {

            theOracleOfDelphiDefi[
                
                types.addBitcoin
                
            ].theTransactionNeedsToBeAdded = true;
        }
    }

    console.log(
        '🐐☢️🤙oracleCallback executed successfully: ' +
        stringify({

            theOracleOfDelphiDefi,
        })
    );
});
