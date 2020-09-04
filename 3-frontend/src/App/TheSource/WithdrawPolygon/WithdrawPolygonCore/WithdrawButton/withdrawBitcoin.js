import { setState, resetReduxX } from '../../../../reduxX';
import { bitcoinExchange } from '../../../../utils';


export default async ({

    amount,
    address,
    userId,
    loginToken,
    fullWithdraw

}) => {

    try {

        setState( 'isLoading', true );

        await bitcoinExchange.withdraw({
 
            userId,
            amount,
            address,
            loginToken,
            fullWithdraw,
        });

        resetReduxX({

            listOfKeysToInclude: [
                [ 'withdrawPolygon', 'amount' ],
                [ 'withdrawPolygon', 'address' ],
                [ 'withdrawPolygon', 'fullWithdraw' ]
            ]
        });

        setState( 'isLoading', false );

        console.log( 'successfully withdrew bitcoin' );
    }
    catch( err ) {

        console.log( 'error in withdrawing bitcoin:', err );                     

        resetReduxX({

            listOfKeysToInclude: [
                [ 'withdrawPolygon', 'amount' ],
                [ 'withdrawPolygon', 'address' ]
            ]
        });

        setState( 'isLoading', false );

        alert(
            
            `error in logging in: ${
                
                (
                    !!err &&
                    !!err.response &&
                    !!err.response.data &&
                    !!err.response.data.message &&
                    err.response.data.message
                ) || 'internal server error'
            }`
        );
    }
};
