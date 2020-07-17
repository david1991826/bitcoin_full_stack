'use strict';

const bluebird = require( 'bluebird' );

const {

    doBitcoinRequest

} = require( 'common-utilities' );

const DELAY_BETWEEN_GETS_IN_MS = 0.2;


module.exports = Object.freeze( ({ transactionIds }) => {

    console.log(

        'running getTransactionIdToTransactionData with transaction ids: ' +
        JSON.stringify( transactionIds, null, 4 )
    );

    return bluebird.mapSeries( transactionIds, transactionId => {

        const args = [

            'gettransaction',
            transactionId
        ];

        return doBitcoinRequest({ args }).then( rawResult => {

            const unformattedTransactionDatum = JSON.parse( rawResult );

            const {

                amount,
                confirmations,
                time,
                timereceived

            } = unformattedTransactionDatum;

            const preformattedTransactionDatum = {

                transactionId,
                amount,
                numberOfConfirmations: confirmations,
                timeSent: time * 1000,
                timeReceived: timereceived * 1000,
            };

            return bluebird.delay( DELAY_BETWEEN_GETS_IN_MS ).then(
                
                () => preformattedTransactionDatum
            );
        });

    }).then( preformattedTransactionDatum => {

        const transctionIdToTransactionData = {};

        for( const {

            transactionId,
            amount,
            numberOfConfirmations,
            timeSent,
            timeReceived,

        } of preformattedTransactionDatum ) {

            transctionIdToTransactionData[ transactionId ] = {

                amount,
                numberOfConfirmations,
                timeSent,
                timeReceived,
            };
        }

        console.log(

            'getTransactionIdToTransactionData executed succesfully, ' +
            'returning transctionIdToTransactionData: ' +
            JSON.stringify( transctionIdToTransactionData, null, 4 )
        );

        return transctionIdToTransactionData;
    });
});
