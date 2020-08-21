'use strict';

const {
    constants: {
        exchanges
    }
} = require( '@bitcoin-api.io/common-exchange' );

const oneDay = 24 * 60 * 60 * 1000;


module.exports = Object.freeze({

    loginTokens: {

        expiryTime: oneDay,
        numberOfAllowedSignedInLoginTokens: 5,
    },

    headers: {

        loginToken: 'login-token',
        userId: 'user-id',
    },

    javascript: {

        styleSpacer: '__style__',
    },

    urls: {

        exchangeUrl: process.env.EXCHANGE_URL,
    },

    exchanges,

    auxiliaryEmailCases: {

        snsNotificationTypes: {

            Delivery: 'Delivery',
            Bounce: 'Bounce',
            Complaint: 'Complaint',
        },

        types: {
            success: 'success',
            block: 'block',
            review: 'review',
        },
    },
});