'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api.io/common-private' );

const { sesv2 } = require( '../aws' );


module.exports = Object.freeze( async ({

    subject,
    html,
    text,
    toEmailAddress,
    fromEmailAddress = 'support@atexchange.io',

}) => {
    
    console.log( 'running sendEmail' );

    const params = {
        Content: {
            Simple: {
                Body: {
                    Html: {
                        Data: html,
                        Charset: 'UTF-8'
                    },
                    Text: {
                        Data: text,
                        Charset: 'UTF-8'
                    }
                },
                Subject: {
                    Data: subject,
                    Charset: 'UTF-8'
                }
            },
        },
        Destination: {
            // BccAddresses: [
            //     'STRING_VALUE',
            //     /* more items */
            // ],
            // CcAddresses: [
            //     'STRING_VALUE',
            //     /* more items */
            // ],
            ToAddresses: [
                toEmailAddress,
                /* more items */
            ]
        },
        FromEmailAddress: fromEmailAddress,
    };

    await new Promise( ( resolve, reject ) => {

        sesv2.sendEmail(
            
            params,
            ( err, data ) => {

                if( !!err ) {
                    
                    console.log(
                        'sendEmail: error in sending email',
                        err    
                    );

                    return reject( err );
                }

                console.log(
                    'sendEmail - email successfully sent - ' +
                    `AWS response data: ${ stringify( data ) }`
                );

                resolve();
            }
        );
    });

    console.log(
        'sendEmail executed successfully'
    );
});
