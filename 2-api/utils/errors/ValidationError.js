'use strict';

const STATUS_CODE_MESSAGE = 'validation_error';


class ValidationError extends Error {

    constructor( message ) {

        super( message );

        this.statusCode = 400;
        this.statusCodeMessage = STATUS_CODE_MESSAGE;
    }
}


ValidationError.statusCodeMessage = STATUS_CODE_MESSAGE;


module.exports = ValidationError;