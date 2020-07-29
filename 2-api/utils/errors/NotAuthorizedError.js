'use strict';

const STATUS_CODE_MESSAGE = 'not_authorized_error';


class NotAuthorizedError extends Error {

    constructor( message ) {

        super( message );

        this.statusCode = 401;
        this.statusCodeMessage = STATUS_CODE_MESSAGE;
    }
}


NotAuthorizedError.statusCodeMessage = STATUS_CODE_MESSAGE;


module.exports = NotAuthorizedError;