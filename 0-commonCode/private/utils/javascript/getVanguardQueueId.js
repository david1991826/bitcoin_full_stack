'use strict';

const queueIdSeparator = '___vanguard___';


module.exports = Object.freeze(
    ({ type, id }) => {
        
        if( !id ) {

            throw new Error( 'getVanguardQueueId error: missing id' );
        }
        else if( !type ) {

            throw new Error( 'getVanguardQueueId error: missing type' );
        }

        return (
            `vanguard_queue${ queueIdSeparator }`+
            `${ type }${ queueIdSeparator }${ id }`
        );
    }
);