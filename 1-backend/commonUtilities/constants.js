'use strict';

const {
    constants: {
        megaServerIdToMegaServerData
    }
} = require( '@bitcoin-api.io/common-private' );

const megaServerId = process.env.ID_OF_CURRENT_MEGA_SERVER;

if( !megaServerIdToMegaServerData[ megaServerId ] ) {

    throw new Error( `invalid mega server id: ${ megaServerId }` );
}


module.exports = Object.freeze({
    
    megaServerId,

    mongo: {
        collectionNames: {
            address_data: 'address_data',
            user_data: 'user_data',
        }
    }
});
