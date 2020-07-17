'use strict';

const uuidv4 = require( 'uuid/v4' );

const getBaseId = Object.freeze( () => uuidv4().split( '-' ).join( '' ) );


module.exports = Object.freeze( ({

    baseId = getBaseId(),

} = {
    
    baseId: getBaseId()

}) => {

    const exchangeUserId = (
        `exchange_user_${ baseId }`
    );

    const exchangeUserIdData = {

        baseId,
        exchangeUserId
    };

    return exchangeUserIdData;
});