'use strict';

const { qrCodeFilePath } = require( './common' );

const {

    constants: {
        
        aws: { storage: { classicalS3Storage } },
        
        // environment: {
        //     isProductionMode
        // }
    }

} = require( '@bitcoin-api/full-stack-api' );

const fs = require( 'fs' );

const {

    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,

} = process.env;

const AWS = require( 'aws-sdk' );

const s3 = new AWS.S3();

AWS.config.update({

    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
});


const getPictureJuice = () => new Promise(
    
    ( resolve, reject ) => {
        
        fs.readFile( qrCodeFilePath, ( err, juice ) => {

            if( !!err ) {

                console.log( 'error in getting picture juice:', err );

                return reject( err );
            }

            console.log( 'successfully got picture juice' );

            resolve( juice );
        });
    }
);


module.exports = async ({

    address

}) => {

    const juice = await getPictureJuice();

    const bucket = process.env.S3_BUCKET_FOR_QR_CODE_PICTURES;
    const key = `qr_codes/${ address }.jpg`;

    const params = {

        Bucket: bucket,
        Key: key,
        ACL: 'public-read',
        Body: juice,
        ContentType: 'image/jpeg'
    };

    await new Promise( ( resolve, reject ) => {
        
        s3.putObject(

            params,
            ( err, data ) => {
                
                if( !!err ) {
                    
                    console.log(
                        'an error occurred in putting to s3:',
                        err,
                        err.stack
                    );

                    return reject( err );
                }
                
                console.log(
                    `successfully put qrCode to s3 for address: ${ address }`,
                    `pictureFilePath ${ qrCodeFilePath } ` +
                    `s3 results: ${ JSON.stringify( data, null, 4 ) }`
                );

                resolve( data );
            }
        );
    });

    return {

        type: classicalS3Storage,
        bucket,
        key
    };
};
