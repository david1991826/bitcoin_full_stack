'use strict';

const { DO_NOT_SHOW_REAL_ERRORS, IS_EXCHANGE } = process.env;

// const defaultErrorName = 'InternalServerError';
const defaultErrorMessage = 'Internal Server Error';
const defaultErrorStatusCode = 500;


const getErrorObject = Object.freeze(({

    // name,
    statusCode,
    message,

}) => {

    if( IS_EXCHANGE ) {

        return {

            statusCode,
            body: JSON.stringify({

                statusCode,
                message,
            })
        };
    }

    return {

        isError: true,
        // name,
        statusCode,
        message,
    };
});


module.exports = Object.freeze( err => {

    err = err || {};

    console.log( 'utils.handleError: the following error has occurred:', err );

    if( DO_NOT_SHOW_REAL_ERRORS && !err.bulltrue ) {

        return getErrorObject({

            statusCode: defaultErrorStatusCode,
            message: defaultErrorMessage,
        });
    }

    const statusCode = (!!err && err.statusCode) || defaultErrorStatusCode;
    const message = (!!err && err.message) || defaultErrorMessage;

    return getErrorObject({

        // name: err.name || defaultErrorName,
        statusCode,
        message,
    });
});