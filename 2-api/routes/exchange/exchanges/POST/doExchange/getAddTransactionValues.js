'use strict';

const {

    utils: {
        stringify,
    }

} = require( '@bitcoin-api.io/common-private' );

const {

    constants: {
        transactions: {
            types,
        },
    }

} = require( '@bitcoin-api.io/common-exchange' );

const {

    exchangeUsers: {

        getBalanceData,
    },

    crypto: {
        cryptoToBTC,
        btcToCrypto,
    },

    constants: {
        exchanges
    }

} = require( '../../../../../exchangeUtils' );

// const doWithdraw = require( './doWithdraw' );


module.exports = Object.freeze( ({

    exchangeUserId,
    exchangeUser,
    type,
    data,

}) => {

    console.log( 'running getAddTransactionValues' );

    const addTransactionValues = {
        
        noLocka: true,
        exchangeUserId,
        type: types.exchange,
    };

    if( type === exchanges.types.btcToCrypto ) {

        const {

            amountInCryptoWanted

        } = data;

        const amountInBTCNeeded = cryptoToBTC({

            amountInCrypto: amountInCryptoWanted
        });

        const balanceData = getBalanceData({

            exchangeUser,
        });

        const amountOfBitcoinUserHas = balanceData.summary.bitcoin.totalAmount;

        console.log(`
            getAddTransactionValues does user have enough
                📈 || 📉 ? 
                ${ stringify({

                    amountOfBitcoinUserHas,
                    amountInBTCNeeded,
                }) }
        `);

        if( amountOfBitcoinUserHas < amountInBTCNeeded ) {

            const error = new Error(
                'User does not have enough bitcoin to perform ' +
                'the requested exchange. ' +
                'The requested exchange requires ' +
                `${ amountInBTCNeeded } BTC. ` +
                `User only has ${ amountOfBitcoinUserHas } BTC.`
            );
            error.statusCode = 400;
            error.bulltrue = true;
            throw error;
        }

        Object.assign(

            addTransactionValues,
            {
                data: {
                    exchangeType: exchanges.types.btcToCrypto,
                    amountInCryptoWanted,
                    amountInBTCNeeded,
                },
            }
        );
    }
    else {

        const {

            amountInBitcoinWanted

        } = data;

        const amountInCryptoNeeded = btcToCrypto({

            amountInBtc: amountInBitcoinWanted
        });

        const balanceData = getBalanceData({

            exchangeUser,
        });

        const amountOfCryptoUserHas = balanceData.summary.crypto.totalAmount;

        console.log(`
            getAddTransactionValues does user have enough
                📈 || 📉 ? 
                ${ stringify({

                    amountOfCryptoUserHas,
                    amountInCryptoNeeded,
                }) }
        `);

        if( amountOfCryptoUserHas < amountInCryptoNeeded ) {

            const error = new Error(
                'User does not have enough bitcoin to perform ' +
                'the requested exchange. ' +
                'The requested exchange requires ' +
                `${ amountInCryptoNeeded } Cryptos. ` +
                `User only has ${ amountOfCryptoUserHas } Cryptos.`
            );
            error.statusCode = 400;
            error.bulltrue = true;
            throw error;
        }

        Object.assign(

            addTransactionValues,
            {
                data: {
                    exchangeType: exchanges.types.cryptoToBTC,
                    amountInBitcoinWanted,
                    amountInCryptoNeeded
                },
            }
        );
    }

    console.log(
        
        'getAddTransactionValues executed successfully,',
        'here is the add transaction data:',
        stringify( addTransactionValues )
    );

    return addTransactionValues;
});