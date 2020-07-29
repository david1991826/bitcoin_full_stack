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
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS
                },
                secondaryIndices: {
                    emailIndex
                }
            }
        }
    }
} = require( '@npm.m.stecky.efantis/common-exchange' );

const f = Object.freeze;

const attributes = f({

    nameKeys: f({
     
        email: '#email',
    }),

    nameValues: f({
     
        email: 'email',
    }),

    valueKeys: f({

        email: ':email',
    }),

    // valueValues: f({

    //     amount: 0,
    // })
});


module.exports = Object.freeze( async ({

    email,
    
}) => {

    console.log(
        `running getExchangeUserByEmail
            with the following values - ${
                stringify({
                    email,
                })
        }`
    );

    const {

        nameKeys,
        nameValues,
        valueKeys

    } = attributes;

    const searchParams = {
        TableName: EXCHANGE_USERS,
        IndexName: emailIndex,
        // ProjectionExpression: [
        //     nameKeys.email,
        // ].join( ', ' ),
        Limit: 5,
        ScanIndexForward: false,
        KeyConditionExpression: (
            `${ nameKeys.email } = ${ valueKeys.email }`
        ),
        ExpressionAttributeNames: {
            [nameKeys.email]: nameValues.email,
        },
        ExpressionAttributeValues: {
            [valueKeys.email]: email,
        },
    };

    const exchangeUserData = (await searchDatabase({
        searchParams,
    })).ultimateResults;

    console.log(
        `getExchangeUserByEmail, got ${ exchangeUserData.length } ` +
        'exchange users'
    );

    if( exchangeUserData.length === 0 ) {

        console.log(

            'getExchangeUserByEmail executed successfully, ' +
            `user with email ${ email } does not exist, returning null🖖🐸`
        );

        return null;
    }
    else if( exchangeUserData.length > 1 ) {
        
        // safeguard 
        throw new Error(
            'getExchangeUserByEmail unexpected error - ' +
            `more than 1 account has the same email: ${ email }`
        );
    }

    const exchangeUser = exchangeUserData[0];
    
    console.log(
        'getExchangeUserByEmail executed successfully, ' +
        `returning exchange user ${ stringify( exchangeUser ) }`
    );

    return exchangeUser;
});
