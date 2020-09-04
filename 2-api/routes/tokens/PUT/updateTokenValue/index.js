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
        stringify,
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
} = require( '@bitcoin-api.io/common-private' );

const {

    accessCodeTools: { getETCData, getReturnCode }

} = require( '../../../../utils' );


module.exports = Object.freeze( async ({

    user

}) => {

    const { userId } = user;

    console.log( 
        `running updateTokenValue with the following values: ${ stringify({
            userId,
        })}`
    );

    const {
        
        encryptedTemplarCode,
        megaCode,
        encryptionId
        
    } = getETCData();

    await doOperationInQueue({

        queueId: getQueueId({ type: USERS, id: userId }),

        doOperation: async () => {

            const newUserEntry = Object.assign(
                
                {},
                user,
                {
                    accessCode: encryptedTemplarCode,
                    encryptionId
                }
            );

            await updateDatabaseEntry({
                tableName: USERS,
                entry: newUserEntry,
            });
        }
    });

    const returnCode = getReturnCode({

        userId,
        megaCode
    });

    console.log( 
        `updateTokenValue executed successfully for user ${ userId }, ` +
        `returning returnCode of length ${ returnCode.length }`
    );

    return {

        returnCode
    };
});
