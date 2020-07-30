'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api.io/common-private' );

const {

    beginningDragonProtection,

} = require( '../../utils' );

const getIfLoginTokenIsValidData = require( './getIfLoginTokenIsValidData' );

const {

    headers

} = require( '../constants' );


module.exports = Object.freeze( async ({

    queueName,
    event,
    ipAddressMaxRate,
    ipAddressTimeRange,

    shouldOnlyGetInitialTokens = true,
    shouldGetFullLoginTokenInfo = false,

}) => {

    const exchangeUserId = event.headers[ headers.userId ];

    if( !exchangeUserId ) {

        const validationError = new Error( 'missing userId' );
        validationError.statusCode = 400;
        validationError.bulltrue = true;
        throw validationError;
    }
    else if(
        (typeof exchangeUserId !== 'string') ||
        (exchangeUserId.length > 200)
    ) {

        const validationError = new Error(
            `invalid userId: ${ exchangeUserId }`
        );
        validationError.statusCode = 400;
        validationError.bulltrue = true;
        throw validationError;
    }

    console.log(

        '🔥🔥🔥🔥🐉🐲🐉🐲Running mongolianBeginningDragonProtection ' +
        `with the following values: ${
            stringify({
                
                queueName,
                event,
                ipAddressMaxRate,
                ipAddressTimeRange,
                exchangeUserId,
                shouldGetFullLoginTokenInfo,
                shouldOnlyGetInitialTokens
            })
        }🐉🐲🐉🐲🔥🔥🔥🔥`
    );

    const powerDragonCollection = {

        exchangeUserId,
    };

    const mongolianDragonFindings = await beginningDragonProtection({

        queueName,
            
        event,

        megaCodeIsRequired: false,

        ipAddressMaxRate,
        ipAddressTimeRange,

        customDragonFunction: async () => {

            const loginTokenId = event.headers[ headers.loginToken ];

            if( !loginTokenId ) {

                const error = new Error(
                    'missing "login-token" in header'
                );
                error.statusCode = 400;
                error.bulltrue = true;
                throw error;
            }

            const {
                
                loginTokenIsValid,
                loginTokens,
                hashedLoginTokenIdFromRequestHeader,

            } = await getIfLoginTokenIsValidData({

                exchangeUserId,
                loginTokenId,
                shouldGetFullLoginTokenInfo,
                shouldOnlyGetInitialTokens
            });

            if( !loginTokenIsValid ) {

                const error = new Error(
                    'invalid "login-token" header provided'
                );
                error.statusCode = 403;
                error.bulltrue = true;
                throw error;
            }

            Object.assign(

                powerDragonCollection,
                {
                    loginTokenId,
                    loginTokens,
                    hashedLoginTokenIdFromRequestHeader,
                }
            );
        },
    });

    const extensiveMongolDragonFindings = Object.assign(

        {},
        mongolianDragonFindings,
        powerDragonCollection
    );

    console.log(
        'mongolianBeginningDragonProtection executed successfully ' +
        `here are the dragon findings: ${
            
            stringify(
                Object.keys( extensiveMongolDragonFindings )
            )
        }`
    );

    return extensiveMongolDragonFindings;
});