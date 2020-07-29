'use strict';

const { IS_EXCHANGE } = process.env;


module.exports = Object.freeze(({

    statusCode = 200,
    body,

}) => {

    if( !!IS_EXCHANGE ) {

        return {

            statusCode,
            body: JSON.stringify( body ),
        };
    }

    return {

        statusCode,
        body
    };
});