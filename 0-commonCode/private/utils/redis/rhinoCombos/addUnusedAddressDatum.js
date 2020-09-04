'use strict';

const jsonEncoder = require( '../../javascript/jsonEncoder' );
const doRedisRequest = require( '../doRedisRequest' );
const getClient = require( '../getClient' );
const {
    redis: {
        listIds
    }
} = require( '../../../constants' );
const stringify = require( '../../stringify' );


module.exports = Object.freeze( async ({

    addressDatum

}) => {

    const { address } = addressDatum;

    console.log(
        'running addUnusedAddressDatum ' +
        '(to rhino) with the following values: ' +
        stringify({

            address,
            addressDatum
        })
    );

    const encodedAddressDatum = jsonEncoder.encodeJson( addressDatum );

    const client = getClient();

    try {

        await doRedisRequest({

            client,
            command: 'lpush',
            redisArguments: [
                listIds.unusedAddressData,
                encodedAddressDatum
            ],
        });

        client.quit();

        console.log(
            'addUnusedAddressDatum - ' + 
            `address ${ address } successfully added to rhino`
        );
    }
    catch( err ) {

        client.quit();

        console.log(
            'addUnusedAddressDatum - ' +
            `error in adding ${ address } to rhino`
        );

        throw err;
    }
});
