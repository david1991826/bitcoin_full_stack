'use strict';

const {

    validation

} = require( 'orgasm' );

const {
    utils: {
        stringify
    },
    constants: {
        environment: {
            isProductionMode
        }        
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    transactions,
    exchanges,
    dreams,
} = require( '../../../../constants' );


module.exports = Object.freeze( ({

    type,
    data,
    exchangeUser,

}) => {

    console.log(
        '-- validateValues 4 addTransactionAndUpdateExchangeUser --' +
        'running validateValues for addTransactionAndUpdateExchangeUser ' +
        `with the following values: ${ stringify({
            type,
            data,
        })}`
    );

    if( !transactions.types[ type ] ) {

        throw new Error(
            `invalid transaction type provided: ${ type }` 
        );
    }

    switch( type ) {
        case transactions.types.addBitcoin:

            const bitcoinMoneyData = (
        
                !!exchangeUser.moneyData &&
                !!exchangeUser.moneyData.bitcoin &&
                exchangeUser.moneyData.bitcoin
        
            ) || null;

            if( !bitcoinMoneyData ) {

                throw new Error(
                
                    'validateValues 4 addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `trying to add transaction on user ${
                        exchangeUser.exchangeUserId
                    } ` +
                    'when that user does not have any bitcoin money data' 
                );
            }

            if( 
                (
                    !data.amount &&
                    (data.amount !== 0)
                ) ||
                (
                    !data.address ||
                    (
                        !!isProductionMode &&
                        !validation.getIsValidAddress( data.address )
                    )
                ) || (

                    bitcoinMoneyData.filter(

                        ({ address }) => (address === data.address)

                    ).length !== 1
                )
            ) {

                throw new Error(
                
                    'validateValues 4 addTransactionAndUpdateExchangeUser ' +
                    'error: ' +
                    `invalid data: ${ JSON.stringify( data ) }`
                );
            }
            break;

        case transactions.types.withdrawBitcoin:
            if( 
                !data.amount ||
                (
                    !data.fee &&
                    (data.fee !== 0)
                ) ||
                !data.withdrawId ||
                !data.address ||
                !Object.keys( transactions.bitcoinWithdrawTypes ).includes(
                    data.bitcoinWithdrawType
                )
            ) {

                throw new Error(
                
                    'validateValues 4 addTransactionAndUpdateExchangeUser' +
                    'error: ' +
                    `invalid data: ${ JSON.stringify( data ) }`
                );
            }
            break;

        case transactions.types.exchange:

            switch( data.exchangeType ) {
                
                case exchanges.types.btcToCrypto:
                    if( 
                        !data.amountInCryptoWanted ||
                        (typeof data.amountInCryptoWanted !== 'number') ||
                        !data.amountInBTCNeeded ||
                        (typeof data.amountInBTCNeeded !== 'number')
                    ) {
                        throw new Error(
                        
                            'validateValues 4 ' +
                            'addTransactionAndUpdateExchangeUser ' +
                            'error: ' +
                            `invalid data: ${ JSON.stringify( data ) }`
                        );
                    }
                    break;
            
                case exchanges.types.cryptoToBTC:
                    if( 
                        !data.amountInBitcoinWanted ||
                        (typeof data.amountInBitcoinWanted !== 'number') ||
                        !data.amountInCryptoNeeded ||
                        (typeof data.amountInCryptoNeeded !== 'number')
                    ) {
                        throw new Error(
                        
                            'validateValues 4 ' +
                            'addTransactionAndUpdateExchangeUser ' +
                            'error: ' +
                            `invalid data: ${ JSON.stringify( data ) }`
                        );
                    }
                    break;

                default:
                    // safeguard: should not be able to get here in normal operation
                    throw new Error(
                        'weird error hngvSkJdsgfh92G385472gefger - ' +
                        'invalid exchange transaction data: ' +
                        JSON.stringify( data )
                    );
            }
            break;
    
        case transactions.types.dream:
            switch( data.dreamType ) {
                case dreams.types.coin:
                    if(
                        !(
                            (typeof data.amount === 'number') &&
                            !Number.isNaN( data.amount )
                        )
                    ) {
                        throw new Error(
                        
                            'validateValues 4 ' +
                            'addTransactionAndUpdateExchangeUser ' +
                            'error: ' +
                            `invalid data: ${ JSON.stringify( data ) }`
                        );
                    }
                    break;
                default:
                    // safeguard: should not be able to get here in normal operation
                    throw new Error(
                        'weird error jjDfJxXcpPWeLaKNriT29935XCSGmkFka816 - ' +
                        'invalid dream transaction data: ' +
                        JSON.stringify( data )
                    );
            }
            break;

        default:
            // safeguard: should not be able to get here in normal operation
            throw new Error( 'monkey error 37826yzxadga39sdjkf?!' );
    }

    console.log(
        '-- validateValues 4 addTransactionAndUpdateExchangeUser -- ' +
        'executed successfully'
    );
});