const fs = require( 'fs' );


module.exports = Object.freeze( ({

    componentPath

}) => new Promise( ( resolve, reject ) => {
    
    fs.readFile( componentPath, ( err, data ) => {

        if( err ) {

            return reject( err );
        }

        resolve( data );
    });
}));