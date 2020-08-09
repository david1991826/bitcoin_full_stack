'use strict';

const QRCode = require( 'qrcode' );
const fs = require( 'fs' );
const { qrCodeFilePath } = require( './common' );

const getDataUrl = ({

    address
    
}) => new Promise( ( resolve, reject ) => {
    
    QRCode.toDataURL(
    
        address,
        ( err, dataUrl ) => {
            
            if( !!err ) {
    
                console.log(
                    'an error occurred in generating the QRCode:', err
                );

                return reject( err );
            }

            console.log( 'QR Code successfully generated' );
            console.log( 'dataUrl length:', dataUrl.length );

            resolve( dataUrl );
        }
    );
});


module.exports = async ({

    address

}) => {

    const dataUrl = await getDataUrl({ address });

    await new Promise( ( resolve, reject ) => {
       
        const base64Data = dataUrl.replace( /^data:image\/png;base64,/, '' );

        fs.writeFile( qrCodeFilePath, base64Data, 'base64', err => {

            if( !!err ) {
        
                console.log( 'error in writing to file:', err );

                return reject( err );
            }
        
            console.log(
                'successfully made QR image and wrote it to path:',
                qrCodeFilePath
            );
            
            resolve();
        });
    });
};