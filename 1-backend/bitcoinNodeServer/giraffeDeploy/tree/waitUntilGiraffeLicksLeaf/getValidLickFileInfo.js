'use strict';

const {

    utils: {
        stringify,
    },

} = require( '@npm.m.stecky.efantis/commonprivate' );

const destroyLickFile = require( './destroyLickFile' );

const fs = require( 'fs' );

const oneMinute = 60 * 1000;


module.exports = Object.freeze( async ({
    
    pathToLickFile,
    
}) => {

    console.log(
        
        `running getValidLickFileInfo from path: ${ pathToLickFile }`
    );

    const lickFile = await new Promise( ( resolve, reject ) => {
       
        fs.readFile(

            pathToLickFile,
            ( err, data ) => {

                if( !!err ) {

                    if( err.code === 'ENOENT' ) {

                        return resolve( null );
                    }

                    return reject( err );
                }

                const lickFile = JSON.parse( data.toString() );

                resolve( lickFile );
            }
        )
    });

    if( !lickFile ) {

        console.log(
            'getValidLickFileInfo executed successfully (no-op) - ' +
            'no lick file'
        );

        return null;
    }

    console.log( `got lickFile ${ stringify( lickFile ) }` );

    await destroyLickFile({

        pathToLickFile
    });

    const {
            
        deployId,
        operationTime,
        operationExpiry,
        deployCommand,
        forceDeploy,

    } = lickFile;

    if(
        !deployId ||
        (typeof deployId !== 'string')
    ) {

        console.log(
            'getValidLickFileInfo executed successfully (no-op) - ' +
            'lick_file with no deployId'
        );

        return null
    }
    else if(
        !operationExpiry ||
        (typeof operationExpiry !== 'number')
    ) {

        console.log(
            'getValidLickFileInfo executed successfully (no-op) - ' +
            'lick_file with no operationExpiry'
        );

        return null;
    }
    else if(
        !operationTime ||
        (typeof operationTime !== 'number') ||
        (
            (operationTime + oneMinute) <
            Date.now()
        )
    ) {

        console.log(
            'getValidLickFileInfo executed successfully (no-op) - ' +
            `lick_file with invalid operationTime: ${ operationTime }`
        );

        return null;
    }

    const lickFileInfo = {
        
        deployId,
        operationExpiry,
        deployCommand,
        forceDeploy
    };

    console.log(
        'getValidLickFileInfo executed successfully - ' +
        `got lickFileInfo: ${ stringify( lickFileInfo ) }`
    );

    return lickFileInfo;
});
