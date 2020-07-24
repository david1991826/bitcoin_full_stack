'use strict';

const {

    utils: {
        stringify,
    },

} = require( '@bitcoin-api.io/common-private' );

const fs = require( 'fs' );


module.exports = Object.freeze( async ({
    
    deployId,
    operationTime,
    operationExpiry,
    pathToLickFile,
    deployCommand,
    forceDeploy,
    
}) => {

    console.log( 'running createLickFile' );

    const lickFileContents = {

        giraffeLick: '🦒lick lick lick...👅👅👅',
        deployId,
        operationTime,
        operationExpiry,
        deployCommand,
        forceDeploy,
    };

    const fileAsString = stringify( lickFileContents );

    await new Promise( ( resolve, reject ) => {
       
        fs.writeFile(

            pathToLickFile,
            fileAsString,
            ( err/*, data*/ ) => {

                if( !!err ) {

                    return reject( err );
                }

                resolve();
            }
        );
    });

    console.log(
        'createLickFile executed successfully - created lickFile: ' +
        stringify( lickFileContents )
    );
});
