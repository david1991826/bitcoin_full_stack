'use strict';

const {
    utils: {
        aws: {
            dino: {
                searchDatabase,
            }
        },
        stringify
    },
} = require( '@bitcoin-api.io/common-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    AUXILIARY_EMAIL_CASES
                },
            }
        },
    }
} = require( '@bitcoin-api.io/common-exchange' );

const {
    constants: {
        auxiliaryEmailCases:{
            types: {
                block,
            },
        }
    }
} = require( '../../../../../exchangeUtils' );

const searchLimit = 1000;

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        email: '#email',
        caseId: '#caseId',
        type: '#type',
    }),

    nameValues: f({
     
        email: 'email',
        caseId: 'caseId',
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


module.exports = Object.freeze( async ({

    email,
    
}) => {

    console.log(
        `running ensureEmailIsNotBlocked
            with the following values - ${
                stringify({
                    email,
                })
        }`
    );

    let paginationValueToUse = null;
    
    const {

        nameKeys,
        nameValues,
        valueKeys,
        valueValues,

    } = attributes;

    do {

        const searchParams = {
            TableName: AUXILIARY_EMAIL_CASES,
            Limit: searchLimit,
            ScanIndexForward: true,
            ProjectionExpression: [
                nameKeys.caseId,
            ].join( ', ' ),
            KeyConditionExpression: (
                `${ nameKeys.email } = ${ valueKeys.email }`
            ),
            FilterExpression: (
                `${ nameKeys.type } = ${ valueKeys.block }`
            ),
            ExpressionAttributeNames: {
                [nameKeys.email]: nameValues.email,
                [nameKeys.caseId]: nameValues.caseId,
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

        const auxiliaryEmailCases = ultimateResults;

        if( auxiliaryEmailCases.length > 0 ) {

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

    console.log(

        'ensureEmailIsNotBlocked executed successfully, ' +
        `user with email ${ email } does not already exist🖖🐸`
    );
});
