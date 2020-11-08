'use strict';

const {

    utils: {
        stringify,
    }

} = require( '@bitcoin-api/full-stack-api' );

const {
    constants: {
        exchangeEmailDeliveryResults: {
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

const MAILBOX_FULL = 'MailboxFull';

const getBouncedEmailEEDRType = Object.freeze( ({

    bounceSubType,

}) => {

    if( bounceSubType === MAILBOX_FULL ) {

        return review;
    }

    return block;
});


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

        const snsMessageObjectMailObject = snsMessageObject.mail || {};

        const data = {

            emailMessageId: snsMessageObjectMailObject.messageId,
            sourceArn: snsMessageObjectMailObject.sourceArn,
            messageEventTime: (
                new Date( snsMessageObjectMailObject.timestamp )
            ).valueOf(),             
        };

        switch( notificationType ) {

            case Delivery: {

                const emailAddresses = (
                    snsMessageObject.delivery.recipients.slice() 
                );
    
                await addEEDRToDatabase({
    
                    emailAddresses,
                    type: success,
                    data,
                });

                break;
            }

            case Bounce: {

                const {

                    bouncedRecipients,
                    bounceType,
                    bounceSubType,
    
                } = snsMessageObject.bounce;
    
                const emailAddresses = bouncedRecipients.map(
                    ({ emailAddress }) => emailAddress
                );
    
                const type = getBouncedEmailEEDRType({
    
                    bounceSubType,
                });
                
                Object.assign(
    
                    data,
                    {
                        bounceType,
                        bounceSubType,
                    }
                );
    
                await addEEDRToDatabase({
    
                    emailAddresses,
                    type,
                    data,
                });

                break;
            }

            case Complaint: {

                const {

                    complainedRecipients,
                    complaintFeedbackType = 'No complaint feedback type provided',
    
                } = snsMessageObject.complaint;
        
                const emailAddresses = complainedRecipients.map(
                    ({ emailAddress }) => emailAddress
                );
    
                Object.assign(
    
                    data,
                    {
                        complaintFeedbackType,
                    }
                );
    
                await addEEDRToDatabase({
    
                    emailAddresses,
                    type: review,
                    data,
                });

                break;
            }

            default: {

                console.log(

                    'Exchange email delivery result type is ' +
                    `${ notificationType } - this case is not considered - ` +
                    'NO-OP'
                );

                break;
            }
        }
    }    

    console.log( 'handleCase executed successfully👩🏿‍💻👨🏻‍💻👩🏼‍💻👨🏾‍💻👏🏿👏🏽👏' );
});
