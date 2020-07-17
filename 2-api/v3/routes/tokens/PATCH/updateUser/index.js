'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry
            }
        },
        doOperationInQueue,
        javascript: {
            getQueueId
        },
        stringify
    },
    constants: {
        aws: {
            database: {
                tableNames: {
                    USERS
                }
            }
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {

    doApiCall

} = require( '../../../../utils' );

const validateAndGetValues = require( './validateAndGetValues' );

const googleCaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';


module.exports = Object.freeze( async ({

    event,
    user,
    ipAddress

}) => {
    
    console.log( 'running updateUser' );

    const body = (
        
        !!event &&
        !!event.body &&
        event.body

    ) || {};

    const rawAgreeToTerms = body.agreeToTerms;
    const rawAgreeToPrivacyPolicy = body.agreeToPrivacyPolicy;
    const rawIsHumanValue = body.isHumanValue;
    const rawTestSecret = body.testSecret106d5196e86847b2b90a14e1a4a829cd;

    const {

        agreeToTerms,
        agreeToPrivacyPolicy,
        isHumanValue,
        bypassIsHumanTest,

    } = validateAndGetValues({

        rawAgreeToTerms,
        rawAgreeToPrivacyPolicy,
        rawIsHumanValue,
        rawTestSecret
    });

    const existingMetadata = user.metadata;

    const newMetadataValues = {};

    const userIsNotAlreadyIsHumanVerified = !(
     
        !!existingMetadata.isHumanInformation &&
        !!existingMetadata.isHumanInformation.isHuman &&
        !!existingMetadata.isHumanInformation.timeOfHumanProof &&
        !!existingMetadata.isHumanInformation.humanIpAddress
    );
    
    if( userIsNotAlreadyIsHumanVerified ) {

        if( !!isHumanValue ) {

            console.log(
                
                'making api call to google to make sure the "is human" ' +
                'code is valid'
            );
    
            const {
    
                success,
                score
    
            } = JSON.parse(
                
                await doApiCall({
    
                    url: googleCaptchaUrl,
                    method: 'POST',
                    headers: {
    
                        'Content-Type': 'application/x-www-form-urlencoded.'
                    },
                    body: {
    
                        secret: process.env.GOOGLE_CAPTCHA_SECRET,
                        response: isHumanValue,
                        remoteip: ipAddress
                    },
                    json: false
                })
            );
    
            if( !success ) {
    
                console.log(
                    
                    'the google api call to verify the human test failed'
                );
    
                const err = new Error( 'unsuccessful captcha verification' );
                err.bulltrue = true;
                err.statusCode = 482;
                throw err;
            }
    
            console.log(
                    
                'the google api call to verify the human was successful'
            );
    
            newMetadataValues.isHumanInformation = {
    
                isHuman: true,
                timeOfHumanProof: Date.now(),
                humanIpAddress: ipAddress,
                humanScore: score,
            };
        }
        else if( bypassIsHumanTest ) {
    
            newMetadataValues.isHumanInformation = {
    
                isHuman: true,
                timeOfHumanProof: Date.now(),
                humanIpAddress: '69.4.2.0',
                humanScore: 69,
            };
        }
    }

    if(
        agreeToTerms &&
        !(
            !!existingMetadata.tos &&
            !!existingMetadata.tos.agrees &&
            !!existingMetadata.tos.timeOfAgreement
        )
    ) {

        newMetadataValues.tos = {

            agrees: true,
            timeOfAgreement: Date.now(),
            ipAddressOfAgreement: ipAddress,
        };
    }

    if(
        agreeToPrivacyPolicy &&
        !(
            !!existingMetadata.privacyPolicy &&
            !!existingMetadata.privacyPolicy.agrees &&
            !!existingMetadata.privacyPolicy.timeOfAgreement
        )
    ) {

        newMetadataValues.privacyPolicy = {

            agrees: true,
            timeOfAgreement: Date.now(),
            ipAddressOfAgreement: ipAddress,
        };
    }

    const thereAreUpdatesToBePerformed = (

        Object.keys( newMetadataValues ).length > 0
    );

    console.log(
        `here are the new metadata values: ${ stringify(
            newMetadataValues
        ) }, ${
            thereAreUpdatesToBePerformed ? (
                'updating the user'
            ) : (
                `there's no need for any updates`
            )
        }`
    );

    if( thereAreUpdatesToBePerformed ) {

        await doOperationInQueue({

            queueId: getQueueId({ type: USERS, id: user.userId }),

            doOperation: async () => {

                const newUser = Object.assign(
                    
                    {},
                    user,
                    {
                        metadata: Object.assign(
                            {},
                            user.metadata,
                            newMetadataValues
                        )
                    }
                );

                await updateDatabaseEntry({
                    tableName: USERS,
                    entry: newUser,
                });
            }
        });
    }

    console.log( 'updateUser executed successfully' );

    return {};
});