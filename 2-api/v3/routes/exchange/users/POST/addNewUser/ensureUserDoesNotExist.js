'use strict';

const {
    utils: {
        stringify
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    exchangeUsers: {
        getIfExchangeUserExists
    }
} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    email,
    
}) => {

    console.log(
        `running ensureUserDoesNotExist
            with the following values - ${
                stringify({
                    email,
                })
        }`
    );

    const exchangeUserExists = await getIfExchangeUserExists({

        email
    });

    if( exchangeUserExists ) {

        const error = new Error(
            `user with email ${ email } already exists`
        );
        error.statusCode = 409;
        error.bulltrue = true;
        throw error;
    }

    console.log(

        'ensureUserDoesNotExist executed successfully, ' +
        `user with email ${ email } does not already exist🖖🐸`
    );
});
