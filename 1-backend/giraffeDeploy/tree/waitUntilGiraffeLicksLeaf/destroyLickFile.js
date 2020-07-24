'use strict';

// const {

//     utils: {
//         stringify,
//     },

// } = require( '@npm.m.stecky.efantis/commonprivate' );

const fs = require( 'fs' );


module.exports = Object.freeze( async ({
    
    pathToLickFile,
    
}) => {

    console.log(
        
        '❌🤫👅running destroyLickFile ' +
        `destroying lickFile on path: ${ pathToLickFile }`
    );

    await new Promise( ( resolve, reject ) => {
       
        fs.unlink(

            pathToLickFile,
            ( err/*, data*/ ) => {

                if( !!err ) {

                    return reject( err );
                }

                resolve();
            }
        );
    });

    console.log(
        '❌🤫👅✅destroyLickFile executed successfully - ' +
        'lick file deleted'
    );
});
