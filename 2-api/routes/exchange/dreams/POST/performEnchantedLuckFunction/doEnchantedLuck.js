'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    utils: {
        aws: {
            dinoCombos: {
                addTransactionAndUpdateExchangeUser,
            }
        }
    },
    constants: {
        transactions,
        dreams,
    }
} = require( '@npm.m.stecky.efantis/common-exchange' );

const {
    random,
} = require( '../../../../../exchangeUtils' );


const flipCoin = Object.freeze( ({

    coinNumberThreshold = 6,

} = {

    coinNumberThreshold: 6,

}) => {

    console.log(

        `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ 🐑☢️ Flipping the Coin　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
        '         -         \n' +
        `need to get coinNumber higher than ${ coinNumberThreshold }`
    );

    const coinNumber = random.getRandomIntegerInclusive({

        min: 1,
        max: 10
    });

    const hasWonThisChallengeOfFate = (

        coinNumber > coinNumberThreshold
    );

    console.log(

        `⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿ 🐑☢️ Flipping the Coin　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑\n` +
        '         -         \n' +
        'executed successfully: ' + stringify({

            coinNumber,
            hasWonThisChallengeOfFate
        })
    );

    return hasWonThisChallengeOfFate;
});


module.exports = Object.freeze( async ({

    amount,
    exchangeUserId,

}) => {

    console.log(
        'running doEnchantedLuck ' +
        `with the following values: ${ stringify({

            amount,
            exchangeUserId
        })}`
    );

    const hasWonGame = flipCoin();
    
    const happyDream = hasWonGame;

    const transactionAmount = hasWonGame ? amount : -amount;

    await addTransactionAndUpdateExchangeUser({

        noLocka: true,
        exchangeUserId,
        type: transactions.types.dream,
        data: {
            dreamType: dreams.types.coin,
            amount: transactionAmount,
            happyDream,
        },
    });

    const luckResults = {

        happyDream,
    };

    console.log(
        'doEnchantedLuck executed successfully - ' +
        `returning luck results: ${ stringify( luckResults ) }`
    );

    return luckResults;
});