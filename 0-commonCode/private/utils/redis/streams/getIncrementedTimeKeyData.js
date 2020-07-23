'use strict';

const getOperationTimeKey = require( './getOperationTimeKey' );
const MAX_64 = 9000000000000000;


module.exports = Object.freeze( ({

    timeKey,
    add = true

}) => {

    const [ rawTimeKeyTime, rawTimeKeyOrder ] = timeKey.split( '-' );
    
    const timeKeyTime = Number( rawTimeKeyTime );
    const timeKeyOrder = Number( rawTimeKeyOrder );

    if( timeKeyOrder > MAX_64 ) {

        throw new Error( 'wow really big time key: ' + timeKey );
    }

    if( add ) {

        if( timeKeyOrder === MAX_64 ) {

            return getOperationTimeKey({

                time: timeKeyTime + 1,
                order: 0
            });
        }

        return getOperationTimeKey({

            time: timeKeyTime,
            order: timeKeyOrder + 1
        });
    }

    if( timeKeyOrder === 0 ) {

        return getOperationTimeKey({

            time: timeKeyTime - 1,
            order: MAX_64
        });
    }

    return getOperationTimeKey({

        time: timeKeyTime,
        order: timeKeyOrder - 1
    });
});
