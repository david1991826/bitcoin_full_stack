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
                Bounce,
                Complaint,
            },
            types: {
                block,
                review,
            },
        }
    }
} = require( '../../../../../exchangeUtils' );

const addAuxiliaryEmailCaseToDatabase = require( './addAuxiliaryEmailCaseToDatabase' );


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
    
        if( notificationType === Bounce ) {
    
            const bouncedEmailAddresses = (
                snsMessageObject.bounce.bouncedRecipients.map(
                    ({ emailAddress }) => emailAddress
                )
            );
    
            await addAuxiliaryEmailCaseToDatabase({
    
                emails: bouncedEmailAddresses,
                type: block,
                metaData: {
    
                    snsMessageObject,
                }
            });
        }
        else if( notificationType === Complaint ) {
    
            const usersWithComplaints = (
                snsMessageObject.complaint.complainedRecipients.map(
                    ({ emailAddress }) => emailAddress
                )
            );
    
            await addAuxiliaryEmailCaseToDatabase({
    
                emails: usersWithComplaints,
                type: review,
                metaData: {
                    
                    snsMessageObject,
                }
            });
        }
    }    

    console.log( 'handleCase executed successfully👩🏿‍💻👨🏻‍💻👩🏼‍💻👨🏾‍💻👏🏿👏🏽👏' );
});
