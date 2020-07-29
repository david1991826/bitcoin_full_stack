'use strict';

// const {
//     utils: {
//         stringify
//     },    
// } = require( '@npm.m.stecky.efantis/commonprivate' );

const updateTokenValue = require( './updateTokenValue' );

const {
    
    getResponse,
    handleError,
    beginningDragonProtection,
    
} = require( '../../../utils' );


exports.handler = Object.freeze( async event => {
    
    console.log( 'running the /tokens - PUT function' );

    try {

        const {
            
            user,

        } = await beginningDragonProtection({

            queueName: 'putUser',
            event,
        });

        const {
            
            returnCode

        } = await updateTokenValue({

            user
        });
    
        const response = {
            
            token: returnCode
        };

        console.log(
            '/tokens - PUT function executed successfully, ' +
            'returning values: ' +
            JSON.stringify( Object.keys( response ) )
        );

        return getResponse({ body: response });
    }
    catch( err ) {

        console.log( `error in /tokens - GET function: ${ err }` );

        return handleError( err );
    }
});