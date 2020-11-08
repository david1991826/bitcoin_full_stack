'use strict';

const {
    utils: {
        aws: {
            dinoCombos: {
                balances: {
                    getBalanceDataForUser
                }
            }
        }
    },
    constants: {
        balances: {
            states: {
                normal,
                transformation
            }
        }
    }   
} = require( '@bitcoin-api/full-stack-api' );

const {
    
    getFormattedEvent,
    getResponse,
    handleError,
    stringify,
    beginningDragonProtection,
    
} = require( '../../../utils' );


exports.handler = Object.freeze( async rawEvent => {
    
    console.log( 'running the /tokens - GET function' );

    try {

        const event = getFormattedEvent({

            rawEvent,
        });

        const {
            
            user,
            dragonDirective,

        } = await beginningDragonProtection({

            queueName: 'getUser',
            event,
            ipAddressMaxRate: 40,
            ipAddressTimeRange: 10000,
            
            advancedCodeMaxRate: 40,
            advancedCodeTimeRange: 10000,
        });

        const {

            balance,
            moneyOutIsInTransformationState

        } = await getBalanceDataForUser({

            userIdOrUser: user
        });

        const balanceData = {
            amount: balance,
            status: moneyOutIsInTransformationState ? transformation : normal,
        };

        const tokenIsActivated = (dragonDirective >= 2);
    
        const response = {

            isActivated: tokenIsActivated,
            balanceData,
        };

        console.log(
            '/tokens - GET function executed successfully, ' +
            'returning values: ' +
            stringify( response, null, 4 )
        );

        return getResponse({ body: response });
    }
    catch( err ) {

        console.log( `error in /tokens - GET function: ${ err }` );

        return handleError( err );
    }
});