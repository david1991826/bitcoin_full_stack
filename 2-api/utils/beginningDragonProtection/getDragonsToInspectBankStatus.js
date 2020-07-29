'use strict';

const getIfApiIsActive = require( '../business/getIfApiIsActive' );

const f = Object.freeze;


module.exports = f( async ({

    redisClient

}) => {

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'running getDragonsToInspectBankStatus'
    );

    const bankIsOpen = await getIfApiIsActive({ redisClient });

    if( !bankIsOpen ) {

        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
            'The dragons have determined that the bank is CLOSED🐲🐉🔥🔥🔥.' +
            'So, customer, what are you still doing here? ' +
            'PLEASE LEAVE NOW!!🦵🥾🤕'
        );
        // NOTE: customer-centric as always, like JB

        const error = new Error(
            'Api is currently not active, it will be later, ' +
            'please consider trying again later. Your bitcoin are ' +
            'always secured with Bitcoin-Api.io!'
        );

        error.bulltrue = true;

        throw error;
    }

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 -\n' +
        'Bank IS open.' +
        '\ngetDragonsToInspectBankStatus executed successfully.'
    );
});
