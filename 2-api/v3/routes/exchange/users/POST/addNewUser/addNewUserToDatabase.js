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
} = require( '@npm.m.stecky.efantis/commonprivate' );

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
} = require( '@npm.m.stecky.efantis/common-exchange' );

const flamingoCrescent = require( '../../../../../sacredElementals/crypto/flamingoCrescent/index' );

const {

    javascript: {
        getHashedPassword,
        getExchangeUserIdData,
        verificationCodeTools: {
            getVerificationCode
        }
    },

} = require( '../../../../../exchangeUtils' );


module.exports = Object.freeze( async ({

    email,
    password,
    ipAddress,
    isHumanScore,
    
}) => {

    console.log(
        `running addNewUserToDatabase
            with the following values - ${
                stringify({
                    email,
                    password,
                    isHumanScore,
                })
        }`
    );

    const {
        
        exchangeUserId,
        baseId

    } = getExchangeUserIdData();

    const hashedPassword = getHashedPassword({

        password,
    });

    const flamingoHashedPassword = flamingoCrescent({

        text: hashedPassword
    });

    const verifyEmailCode = getVerificationCode({

        baseId,
    });

    const userObject = {

        exchangeUserId,
        emailToVerify: email,
        hashedPassword: flamingoHashedPassword,
        verifyEmailCode,
        metadata: {
            creation: {
                date: Date.now(),
                ipAddress,
                isHumanScore,
            }
        }
    };

    await updateDatabaseEntry({

        tableName: EXCHANGE_USERS,
        entry: userObject,
    });

    console.log(
        'addNewUserToDatabase executed successfully'
    );

    return {
        
        userObject,
        verifyEmailCode
    };
});
