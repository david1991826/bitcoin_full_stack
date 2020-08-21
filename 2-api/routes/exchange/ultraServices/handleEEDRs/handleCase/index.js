'use strict';

const {

    utils: {
        stringify,
    }

} = require( '@bitcoin-api.io/common-private' );

const {
    constants: {
        auxiliaryEmailCases: {
            snsNotificationTypes: {
                Delivery,
                Bounce,
                Complaint,
            },
            types: {
                success,
                block,
                review,
            },
        }
    }
} = require( '../../../../../exchangeUtils' );

const addEEDRToDatabase = require( './addEEDRToDatabase' );


module.exports = Object.freeze( async ({

    event,

}) => {

    console.log(
        
        'running handleCase - here is the event: ' +
        stringify( event )
    );

    const records = event.Records;

    for( const record of records ) {

        const snsMessageObject = JSON.parse( record.Sns.Message );

        const {
    
            notificationType
            
        } = snsMessageObject;
    
        // TODO: check type
        if( notificationType === Delivery ) {

            const emailAddresses = (
                // TODO:
                snsMessageObject.delivery.deliveryRecipients.map(
                    ({ emailAddress }) => emailAddress
                )
            );

            const mainData = {

                // TODO: check is getting appropriate values
                messageId:  snsMessageObject.mail.messageId,
                sourceArn: snsMessageObject.mail.sourceArn,
                timestamp: snsMessageObject.mail.timestamp,             
            };

            await addEEDRToDatabase({

                emailAddresses,
                type: success,
                mainData,
            });
        }
        if( notificationType === Bounce ) {
    
            const emailAddresses = (
                snsMessageObject.bounce.bouncedRecipients.map(
                    ({ emailAddress }) => emailAddress
                )
            );

            const mainData = {

                messageId:  snsMessageObject.mail.messageId,
                sourceArn: snsMessageObject.mail.sourceArn,
                timestamp: snsMessageObject.mail.timestamp,             
            };

            await addEEDRToDatabase({

                emailAddresses,
                type: block,
                mainData,
            });

            // await addAuxiliaryEmailCaseToDatabase({
    
            //     emails: bouncedEmailAddresses,
            //     type: block,
            //     metaData: {
    
            //         snsMessageObject,
            //     }
            // });
        }
        else if( notificationType === Complaint ) {
    
            const emailAddresses = (
                snsMessageObject.complaint.complainedRecipients.map(
                    ({ emailAddress }) => emailAddress
                )
            );

            const mainData = {

                // TODO: check is getting appropriate values
                messageId:  snsMessageObject.mail.messageId,
                sourceArn: snsMessageObject.mail.sourceArn,
                timestamp: snsMessageObject.mail.timestamp,             
            };

            await addEEDRToDatabase({

                emailAddresses,
                type: review,
                mainData,
            });

            // await addAuxiliaryEmailCaseToDatabase({
    
            //     emails: usersWithComplaints,
            //     type: review,
            //     metaData: {
                    
            //         snsMessageObject,
            //     }
            // });
        }
    }    

    console.log( 'handleCase executed successfully👩🏿‍💻👨🏻‍💻👩🏼‍💻👨🏾‍💻👏🏿👏🏽👏' );
});
