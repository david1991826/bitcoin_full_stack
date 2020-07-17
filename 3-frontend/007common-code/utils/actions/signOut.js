import { getState, setState, resetReduxX } from '../../reduxX';
import bitcoinExchangeComponent from '../bitcoinExchangeComponent';


export default async () => {

    const loginToken = getState( 'auth', 'loginToken' );
    const userId = getState( 'auth', 'userId' );

    if(
        !!loginToken &&
        !!userId
    ) {
       
        setState( 'isLoading', true );

        try {

            await bitcoinExchangeComponent.signOut({

                userId,
                loginToken
            });
        }
        catch( err ) {

            console.log( 'error in signing out:', err );
        }
    }

    resetReduxX();

    localStorage.clear();
};
