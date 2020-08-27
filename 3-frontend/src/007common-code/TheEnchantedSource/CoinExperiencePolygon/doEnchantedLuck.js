import { getState, setState, resetReduxX } from '../../reduxX';
import { bitcoinExchange, actions } from '../../utils';


export default async () => {

    const amount = getState( 'coinExperiencePolygon', 'amount' );

    setState( 'isLoading', true );

    try {

        const userId = getState( 'auth', 'userId' );
        const loginToken = getState( 'auth', 'loginToken' );
        
        await bitcoinExchange.enchantedLuck({

            userId,
            loginToken,
            amount,
        });

        await actions.refreshUserData({ setToLoading: false });
        
        resetReduxX({
            listOfKeysToInclude: [
                [ 'isLoading' ],
                [ 'coinExperiencePolygon', 'amount' ],
            ]
        });
    }
    catch( error ) {

        setState( 'isLoading', false );

        console.log( 'the error:', error );

        alert(
            
            `error in doing exchange: ${
                (
                    !!error &&
                    !!error.response &&
                    !!error.response.data &&
                    !!error.response.data.message &&
                    error.response.data.message

                ) || 'internal server error'
            }`
        );   
    }
};
