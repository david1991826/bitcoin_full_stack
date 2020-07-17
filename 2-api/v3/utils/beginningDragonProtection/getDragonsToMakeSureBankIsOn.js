'use strict';

const getIfApiIsOnData = require( '../business/getIfApiIsOnData' );


module.exports = Object.freeze( async ({

    redisClient
    
}) => {

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'The dragons are making sure the bank is on🐊🦖🤠. ' +
        'running getDragonsToMakeSureBankIsOn'
    );

    const onAndOffSwitchData = await getIfApiIsOnData({

        redisClient
    });

    if( !onAndOffSwitchData || !onAndOffSwitchData.bitcoinApiIsOn ) {

        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 -\n' +
            'Bank IS off.' +
            '\nThe dragons will now "escort" the customers that ' +
            `shouldn't be here.🐲ROAR!!!🔥🔥🔥👨‍👩‍👧‍👧➡️`
        );
        
        const defaultErrorMessage = (

            'Api is currently not active, it will be later, ' +
            'please consider trying again later. Your Bitcoins are ' +
            'always safely stored with Bitcoin-Api.io!'
        );

        const errorMessage = (

            !!onAndOffSwitchData &&
            !!onAndOffSwitchData.bitcoinApiIsOffReason &&
            onAndOffSwitchData.bitcoinApiIsOffReason

        ) || defaultErrorMessage;

        const error = new Error( errorMessage );

        error.bulltrue = true;

        throw error;
    }

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 -\n' +
        'Bank IS on.' +
        '\ngetDragonsToMakeSureBankIsOn executed successfully.🦖🍄'
    );
});
