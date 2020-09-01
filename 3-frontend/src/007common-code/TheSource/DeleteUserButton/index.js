import { createElement as e, useState } from 'react';
import { getState, setState, resetReduxX } from '../../reduxX';
import { bitcoinExchange } from '../../utils';
import { usefulComponents } from '..';


export default () => {

    const [ clickCount, setClickCount ] = useState( 0 );

    const isWarningMode = (clickCount < 4);

    const isLoading = getState( 'isLoading' );

    return e(

        usefulComponents.POWBlock,
        {
            marginBottom: 40,
            backgroundColor: isWarningMode ? 'darkred' : 'red',
            onClick: async () => {

                if( isWarningMode ) {

                    return setClickCount( clickCount + 1 );
                }

                try {

                    setState( 'isLoading', true );

                    const userId = getState(
                        'auth',
                        'userId'
                    );
                    const loginToken = getState(
                        'auth',
                        'loginToken'
                    );

                    await bitcoinExchange.deleteUser({

                        userId,
                        loginToken,
                    });

                    resetReduxX();

                    localStorage.clear();
                }
                catch( err ) {

                    setState( 'isLoading', false );

                    alert(            
                        `error in deleting user: ${
                            
                            (
                                !!err &&
                                !!err.response &&
                                !!err.response.data &&
                                !!err.response.data.message &&
                                err.response.data.message
            
                            ) || 'internal server error'
                        }`
                    );

                    setClickCount( 0 );
                }
            },
            text: isWarningMode ? (
                'Delete User (requires 5 clicks)'
            ) : 'Delete User (are you sure?)',
            isLoadingMode: isLoading,
            marginTop: 100,
        }
    );
};
