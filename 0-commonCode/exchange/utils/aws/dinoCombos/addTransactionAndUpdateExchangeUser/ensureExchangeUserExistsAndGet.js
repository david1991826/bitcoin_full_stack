'use strict';

const {
    utils: {
        stringify,
    }
} = require( '@bitcoin-api.io/common-private' );

const getExchangeUser = require( '../getExchangeUser' );


module.exports = Object.freeze( async ({

    exchangeUserId,

}) => {

    console.log(
        
        'running ensureExchangeUserExistsAndGet with the following values: ' +
        stringify({
            exchangeUserId,
        })
    );

    const exchangeUser = await getExchangeUser({

        exchangeUserId,
    });

    if( !exchangeUser ) {

        throw new Error(

            'addTransactionAndUpdateExchangeUser - ' +
            'ensureExchangeUserExistsAndGet error: ' +
            `exchange user with id "${ exchangeUserId } does not exist!🙀`
        );
    }

    console.log(
        
        'ensureExchangeUserExistsAndGet executed successfully - ' +
        'exchange user exists🖖'
    );

    return exchangeUser;
});
