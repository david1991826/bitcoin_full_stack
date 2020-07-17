'use strict';

const {
    utils: {
        doOperationInQueue,
        stringify,
        javascript: {
            getQueueId
        },
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    EXCHANGE_USERS
                }
            }
        }
    }
} = require( '@npm.m.stecky.efantis/common-exchange' );
 
const validateAndGetValues = require( './validateAndGetValues' );
const ensureExchangeUserHasEnoughMoney = require( './ensureExchangeUserHasEnoughMoney' );
const doEnchantedLuck = require( './doEnchantedLuck' );


const performEnchantedLuckFunctionCore = Object.freeze( async ({

    exchangeUserId,
    amount,

}) => {

    await ensureExchangeUserHasEnoughMoney({

        amount,
        exchangeUserId,
    });

    const doEnchantedLuckResults = await doEnchantedLuck({

        amount,
        exchangeUserId,
    });

    return doEnchantedLuckResults;
});


module.exports = Object.freeze( async ({

    event,
    ipAddress,
    exchangeUserId
    
}) => {
    
    const requestBody = event.body;

    const rawAmount = (
        requestBody.amount
    ) || null;

    console.log(
        
        `running performEnchantedLuckFunction
            with the following values - ${
                
                stringify({

                    exchangeUserId,
                    ipAddress,
                    rawAmount,
                })
        }`
    );

    const {

        amount,

    } = validateAndGetValues({

        rawAmount
    });

    const enchantedLuck = await doOperationInQueue({
        queueId: getQueueId({ type: EXCHANGE_USERS, id: exchangeUserId }),
        doOperation: async () => {

            return await performEnchantedLuckFunctionCore({

                exchangeUserId,
                amount,
            });
        }
    });

    console.log(
        `performEnchantedLuckFunction executed successfully
            - returning values ${
                stringify( enchantedLuck )
        }`
    );

    return enchantedLuck;
});
