'use strict';

const {
    utils: {
        aws: {
            dino: {
                updateDatabaseEntry
            }
        },
        stringify
    },
} = require( '@bitcoin-api.io/common-private' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS
                },
            }
        }
    }
} = require( '@bitcoin-api.io/common-exchange' );

const flamingoCrescent = require( '../../../../../sacredElementals/crypto/flamingoCrescent/index' );

const {

    javascript: {
        getHashedPassword,
        // getExchangeUserIdData,
        // verificationCodeTools: {
        //     getVerificationCode
        // }
    },

} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    email,
    password,
    ipAddress,
    exchangeUserId,
    emailMessageId,
    verifyEmailCode,
    // isHumanScore,
    
}) => {

    console.log(
        `running addNewUserToDatabase
            with the following values - ${
                stringify({
                    email,
                    password,
                    exchangeUserId,
                    emailMessageId,
                    verifyEmailCode,
                    // isHumanScore,
                })
        }`
    );

    // const {
        
    //     exchangeUserId,
    //     baseId

    // } = getExchangeUserIdData();

    const hashedPassword = getHashedPassword({

        password,
    });

    const flamingoHashedPassword = flamingoCrescent({

        text: hashedPassword
    });

    // const verifyEmailCode = getVerificationCode({

    //     baseId,
    // });

    const userObject = {

        exchangeUserId,
        emailMessageId,
        verifyEmailCode,
        emailToVerify: email,
        hashedPassword: flamingoHashedPassword,
        metadata: {
            creation: {
                date: Date.now(),
                ipAddress,
                // isHumanScore,
            }
        }
    };

    await updateDatabaseEntry({

        tableName: EXCHANGE_USERS,
        entry: userObject,
    });

    const responseObject = {};

    console.log(

        'addNewUserToDatabase executed successfully - ' +
        `returning values: ${ stringify( responseObject ) }`
    );

    return responseObject;
});
