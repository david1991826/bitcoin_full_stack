'use strict';

const queueIdSeparator = '___';


module.exports = Object.freeze(
    ({ type, id }) => {
        
        if( !id ) {

            throw new Error( 'getQueueId error: missing id' );
        }
        else if( !type ) {

            throw new Error( 'getQueueId error: missing type' );
        }

        return (
            `queue${ queueIdSeparator }${ type }${ queueIdSeparator }${ id }`
        )
    }
);