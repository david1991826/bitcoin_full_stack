'use strict';

const STATUS_CODE_MESSAGE = 'bad_request';


class BadRequestError extends Error {

    constructor( message ) {

        super( message );

        this.statusCode = 400;
        this.statusCodeMessage = STATUS_CODE_MESSAGE;
    }
}


BadRequestError.statusCodeMessage = STATUS_CODE_MESSAGE;


module.exports = BadRequestError;