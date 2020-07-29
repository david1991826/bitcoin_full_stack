'use strict';

const {
    errors: { BadRequestError },
} = require( '../../../utils' );


module.exports = Object.freeze({
    
    throwNotEnoughBitcoinOnTokenError: Object.freeze( () => {
        
        const errorMessage = (
            'Error in trying to withdraw bitcoins. ' +
            'Token does not have enough bitcoin ' +
            'to perform the requested withdraw.'
        );

        const err = new BadRequestError( errorMessage );
        
        err.bulltrue = true;

        throw err;
    }),
});
