'use strict';


module.exports = Object.freeze( ({

    exchangeUserId

}) => {

    if(
        !exchangeUserId ||
        (typeof exchangeUserId !== 'string')
    ) {

        throw new Error(

            'getExchangeUserIdDataComponents error: invalid exchangeUserId'
        );
    }

    const splitExchangeUserId = exchangeUserId.split( '_' );

    if( splitExchangeUserId.length !== 3 ) {
     
        throw new Error(

            'getExchangeUserIdDataComponents error: invalid exchangeUserId'
        );
    }

    if( 
        !(
            (
                splitExchangeUserId[0] === 'exchange'
            ) &&
            (
                splitExchangeUserId[1] === 'user'
            ) &&
            (
                !!splitExchangeUserId[2] &&
                (splitExchangeUserId[2].length > 5)  &&
                (splitExchangeUserId[2].length < 100) 
            )
        )
    ) {

        throw new Error(

            'getExchangeUserIdDataComponents error: invalid exchangeUserId'
        );
    }

    const exchangeUserIdDataComponents = {
        
        baseId: splitExchangeUserId[2]
    };

    return exchangeUserIdDataComponents;
});