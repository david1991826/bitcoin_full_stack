'use strict';

const {

    stringify,
    getResponse

} = require( '../../../utils/v3' );


exports.handler = Object.freeze( async () => {
    
    console.log(`
    
    
    
        The log for this request: ${ stringify( {

            ['🐲']: 'YES, this is the TRUE power of the DRAGON!!🔥🔥🔥🔥🔥🐉'

        }, null, 4 ) }
    
    
    
    `);
    
    return getResponse({

        body: true
    });
});
