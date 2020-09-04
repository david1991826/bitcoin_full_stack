import { getState, setState } from '../../reduxX';
import bitcoinExchange from '../bitcoinExchangeInstance';


export default async ({

    setToLoading = true,

} = { setToLoading: true }) => {

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    try {
        
        if( setToLoading ) {

            setState( 'isLoading', true );
        }

        // const userData = {
        //     "userId": "exchange_user_bb791f9e86a94436aaeb0a2a10bce5f4",
        //     "email": "mikeysteckyefantis@gmail.com",
        //     "balanceData": {
        //         "bitcoin": {
        //             "totalAmount": 1,
        //             "depositAddress": "2ND8JVqU3GTgU6wJFd2m2eZxadcaoiK4E1H"
        //         },
        //         "bitcoinWithdraws": {
        //             "totalAmount": 0,
        //             "currentState": "power_omega"
        //         },
        //         "crypto": {
        //             "totalAmount": 0
        //         },
        //         "exchange": {
        //             "bitcoin": {
        //                 "totalAmount": -0.9
        //             },
        //             "crypto": {
        //                 "totalAmount": 900
        //             }
        //         },
        //         "summary": {
        //             "bitcoin": {
        //                 "totalAmount": 0.1
        //             },
        //             "crypto": {
        //                 "totalAmount": 900
        //             }
        //         }
        //     }
        // };

        const userData = await bitcoinExchange.getUser({

            userId,
            loginToken,
        });

        // console.log(`
        
        
        //     REFRESH USER MEGA LOG: ${ JSON.stringify( {

        //         userData
                
        //     }, null, 4 ) }
        
        // `);

        const setStateArguments = [
            {
        
                keys: [ 'loggedInMode', 'userData' ],
                value: userData
            }
        ];

        if( setToLoading ) {

            setStateArguments.push(
                {
                    keys: 'isLoading',
                    value: false
                }
            );
        }

        setState( ...setStateArguments );
    }
    catch( err ) {

        console.log( 'error getting user data', err );

        if( setToLoading ) {

            setState( 'isLoading', false );
        }

        throw err;
    }
};
