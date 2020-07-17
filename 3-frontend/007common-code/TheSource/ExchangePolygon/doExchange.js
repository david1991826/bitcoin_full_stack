import { getState, setState, resetReduxX } from '../../reduxX';
import { bitcoinExchange, actions } from '../../utils';


export default async () => {

    const amountWantedInCryptos = getState( 'exchangePolygon', 'amountWantedInCryptos' );

    if( amountWantedInCryptos ) {

        setState( 'isLoading', true );

        try {

            const userId = getState( 'auth', 'userId' );
            const loginToken = getState( 'auth', 'loginToken' );
            
            await bitcoinExchange.exchange({

                userId,
                loginToken,
                amountWantedInCryptos,
            });

            await actions.refreshUserData({ setToLoading: false });
            
            resetReduxX({
                listOfKeysToInclude: [
                    [ 'isLoading' ],
                    [ 'exchangePolygon', 'amountWantedInBitcoin' ],
                    [ 'exchangePolygon', 'amountWantedInCryptos' ],
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
    }

    const amountWantedInBitcoin = getState( 'exchangePolygon', 'amountWantedInBitcoin' );

    if( !!amountWantedInBitcoin ) {

        setState( 'isLoading', true );

        try {

            const userId = getState( 'auth', 'userId' );
            const loginToken = getState( 'auth', 'loginToken' );

            await bitcoinExchange.exchange({

                userId,
                loginToken,
                amountWantedInBitcoin,
            });
            
            await actions.refreshUserData({ setToLoading: false });

            resetReduxX({
                listOfKeysToInclude: [
                    [ 'isLoading' ],
                    [ 'exchangePolygon', 'amountWantedInBitcoin' ],
                    [ 'exchangePolygon', 'amountWantedInCryptos' ],
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
    }
};
