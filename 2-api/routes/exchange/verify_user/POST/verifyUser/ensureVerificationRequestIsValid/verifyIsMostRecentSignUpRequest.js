'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        javascript: {
            getQueueId
        },
        doOperationInQueue,
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

const searchLimit = 1000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        email: '#email',
        creationDate: '#creationDate',
        type: '#type',
    }),

    nameValues: f({
     
        email: 'email',
        creationDate: 'creationDate',
        type: 'type',
    }),

    valueKeys: f({

        email: ':email',
        block: ':block',
    }),

    valueValues: f({

        block
    }),
});

// const {
//     aws: {
//         dino: {
//             getExchangeDatabaseEntry
//         }
//     },
//     javascript: {
//         getHashedPassword,
//         getExchangeUserIdData,
//         verificationCodeTools: {
//             // getVerificationCode,
//             getVerificationCodeComponents,
//         }
//     },
// } = require( '../../../../../../exchangeUtils' );

// TODO: WITH EEDR:EMAIL LOCK search the DB to ensure first is first
module.exports = Object.freeze( async ({

    email,
    messageId
    
}) => {

    console.log(
        
        'running verifyIsMostRecentSignUpRequest'
    );

    await doOperationInQueue({
            
        queueId: getQueueId({
            
            type: EXCHANGE_EMAIL_DELIVERY_RESULTS,
            id: email,
        }),
        
        doOperation: async () => {

            // TODO: under construction👷‍♀️👷‍♂️🚧🏗

            const {

                nameKeys,
                nameValues,
                valueKeys,
                valueValues,
        
            } = attributes;
        
            let paginationValueToUse = null;
        
            do {
        
                const searchParams = {
                    TableName: EXCHANGE_EMAIL_DELIVERY_RESULTS,
                    Limit: searchLimit,
                    ScanIndexForward: true,
                    ProjectionExpression: [
                        nameKeys.creationDate,
                    ].join( ', ' ),
                    KeyConditionExpression: (
                        `${ nameKeys.email } = ${ valueKeys.email }`
                    ),
                    FilterExpression: (
                        `${ nameKeys.type } = ${ valueKeys.block }`
                    ),
                    ExpressionAttributeNames: {
                        [nameKeys.email]: nameValues.email,
                        [nameKeys.creationDate]: nameValues.creationDate,
                        [nameKeys.type]: nameValues.type,
                    },
                    ExpressionAttributeValues: {
                        [valueKeys.email]: email,
                        [valueKeys.block]: valueValues.block,
                    },
                    ExclusiveStartKey: paginationValueToUse || undefined,
                };
        
                const {
        
                    ultimateResults,
                    paginationValue
            
                } = await searchDatabase({
            
                    searchParams
                });
        
                const exchangeEmailDeliveryBlockResults = ultimateResults;
                // const auxiliaryEmailCases = ultimateResults;
                // EXCHANGE_EMAIL_DELIVERY_RESULTS
        
                if( exchangeEmailDeliveryBlockResults.length > 0 ) {
        
                    console.log(
        
                        'ensureEmailIsNotBlocked error: ' +
                        `the email "${ email }" has been blocked`
                    );
        
                    const error = new Error(
        
                        `email address "${ email }" has been blocked`
                    );
                    error.statusCode = 403;
                    error.bulltrue = true;
                    throw error;
                }
        
                if( !!paginationValue ) {
        
                    paginationValueToUse = paginationValue;
                }
                else {
        
                    paginationValueToUse = null;
                }
        
            } while( !!paginationValueToUse );
        }
    });
    
    console.log(
        
        'verifyIsMostRecentSignUpRequest executed successfully -'
    );
});
