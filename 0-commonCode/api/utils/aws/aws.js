'use strict';

const AWS = require( 'aws-sdk' );

const {

    IS_LAMBDA,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION

} = process.env;

if( !IS_LAMBDA ) {

    AWS.config.update({

        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: AWS_REGION
    });
}


module.exports = Object.freeze({

    AWS,
    database: new AWS.DynamoDB.DocumentClient(),
});
