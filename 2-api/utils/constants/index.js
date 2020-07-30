'use strict';

const {

    aws,
    MEGA_SEPARATOR,
    users,
    withdraws,
    urls

} = require( '@bitcoin-api.io/common-private' ).constants;

module.exports = Object.freeze({

    aws,
    MEGA_SEPARATOR,
    users,
    withdraws,

    addressDataGroups: {

        MAX_NUMBER_OF_ADDRESSES_PER_ADDRESS_DATA_GROUP: (
            
            process.env.MAX_NUMBER_OF_ADDRESSES_PER_ADDRESS_DATA_GROUP
        ),
    },

    urls,

    google: {

        captcha: {

            verifyUrl: 'https://www.google.com/recaptcha/api/siteverify'
        },
    }
});