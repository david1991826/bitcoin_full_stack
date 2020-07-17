'use strict';

const {
    utils: {
        stringify
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    utils: {
        aws: {
            dinoCombos: {
                getExchangeUser
            }
        }
    }
} = require( '@npm.m.stecky.efantis/common-exchange' );

const {
    exchangeUsers: {
        getBalanceData
    }
} = require( '../../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    exchangeUserId,

}) => {

    console.log(
        'running validateAndGetExchangeUser'
    );

    const exchangeUser = await getExchangeUser({

        exchangeUserId,
    });

    const balanceData = getBalanceData({

        exchangeUser,
    });

    const bitcoin = balanceData.summary.bitcoin.totalAmount;
    const cryptos = balanceData.summary.crypto.totalAmount;

    console.log(

        'validateAndGetExchangeUser - ' +
        'user balance exchangeUser and its balance: '  +
        stringify({ bitcoin })
    );

    if( bitcoin > 0 ) {

        const error = new Error(
            'cannot delete an account that has bitcoin or crypto in it'
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }
    else if( cryptos > 0 ) {

        const error = new Error(
            'cannot delete an account that has crypto in it'
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    console.log(
        'validateAndGetExchangeUser executed successfully - ' +
        'user will be deleted'
    );

    return exchangeUser;
});
