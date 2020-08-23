'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        stringify,
    },
} = require( '@bitcoin-api.io/common-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_EMAIL_DELIVERY_RESULTS
                }
            }
        }
    },
} = require( '@bitcoin-api.io/common-exchange' );

const {
    constants: {
        exchangeEmailDeliveryResults: {
            types: {
                success
            }
        }
    }
} = require( '../../../../../../exchangeUtils' );

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        email: '#email',
        emailMessageId: '#emailMessageId',
    }),

    nameValues: f({
     
        email: 'email',
        emailMessageId: 'emailMessageId',
    }),

    valueKeys: f({

        email: ':email',
        success: ':success',
    }),

    valueValues: f({

        success
    }),
});


// TODO: update to verifyEmailMessageIdIsValid
module.exports = Object.freeze( async ({

    email,
    emailMessageId,
    
}) => {

    console.log(
        
        'running verifyIsMostRecentSignUpRequest with the ' +
        `following values: ${ stringify({
            
            email,
            emailMessageId,
        })}`
    );

    const {

        nameKeys,
        nameValues,
        valueKeys,
        valueValues,

    } = attributes;

    const searchParams = {

        TableName: EXCHANGE_EMAIL_DELIVERY_RESULTS,
        Limit: 1,
        ScanIndexForward: false,
        ProjectionExpression: [
            nameKeys.emailMessageId,
        ].join( ', ' ),
        KeyConditionExpression: (
            `${ nameKeys.email } = ${ valueKeys.email }`
        ),
        FilterExpression: (
            `${ nameKeys.type } = ${ valueKeys.success }`
        ),
        ExpressionAttributeNames: {
            [nameKeys.email]: nameValues.email,
            [nameKeys.emailMessageId]: nameValues.emailMessageId,
            [nameKeys.type]: nameValues.type,
        },
        ExpressionAttributeValues: {
            [valueKeys.email]: email,
            [valueKeys.success]: valueValues.success,
        },
        // ExclusiveStartKey: paginationValueToUse || undefined,
    };

    const {

        ultimateResults,

    } = await searchDatabase({

        searchParams
    });

    const exchangeEmailDeliverySuccessResult = ultimateResults;

    if( exchangeEmailDeliverySuccessResult.length === 0 ) {

        throw new Error(

            'Weird verifyIsMostRecentSignUpRequest error: ' +
            'no exchange email delivery results found for ' +
            `email ${ email }.`
        );
    }

    const eedrEmailMessageId = (
        exchangeEmailDeliverySuccessResult[0].emailMessageId
    );

    if( eedrEmailMessageId !== emailMessageId ) {

        const error = new Error(
            'The provided email verification link has been expired. ' +
            'Please try creating your ' +
            'account again. Sorry for any inconvenience.'
        );
        error.statusCode = 400;
        error.bulltrue = true;
        throw error;
    }

    console.log(
        
        'verifyIsMostRecentSignUpRequest executed successfully -'
    );
});
