'use strict';

const bluebird = require( 'bluebird' );

const {
    utils: {
        stringify,
    },
} = require( '@bitcoin-api.io/common-private' );

const updateAddressDatum = require( './updateAddressDatum' );

const addressUpdateConcurrency = (
    
    Number( process.env.ADDRESS_UPDATE_CONCURRENCY ) ||
    3
);


module.exports = Object.freeze( async ({

    canonicalAddressData,
    mongoCollections

}) => {

    const userIdToBitcoinNodeAmountIn = {};

    console.log(

        'running updateAddressData with this many addresses: ' +
        canonicalAddressData.length
    );

    await bluebird.map(
        canonicalAddressData,
        async canonicalAddressDatum => {

            await updateAddressDatum({

                canonicalAddressDatum,
                mongoCollections,
                userIdToBitcoinNodeAmountIn
            });
        },
        { concurrency: addressUpdateConcurrency }
    );

    console.log(
        
        'updateAddressData executed successfully - ' +
        `collected data: ${ stringify({
            ['number of users who freshly deposited bitcoin']: Object.keys(
                userIdToBitcoinNodeAmountIn
            ).length,
        })}`
    );

    return {
        userIdToBitcoinNodeAmountIn
    };
});
