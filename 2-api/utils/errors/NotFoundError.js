'use strict';

const STATUS_CODE_MESSAGE = 'not_found_error';


class NotFoundError extends Error {

    constructor( message ) {

        super( message );

        this.statusCode = 404;
        this.statusCodeMessage = STATUS_CODE_MESSAGE;
    }
}


NotFoundError.statusCodeMessage = STATUS_CODE_MESSAGE;


module.exports = NotFoundError;