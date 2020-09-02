import { setState } from '../../reduxX';
import { bitcoinExchange } from '../../utils';
// import safeGetGoogleCode from './safeGetGoogleCode';


export default async ({

    isLoading,
    emailInput,
    passwordInput,
    callback,

}) => {

    if( isLoading ) {

        return;
    }

    try {

        setState( 'isLoading', true );
        
        // const googleCode = await safeGetGoogleCode();

        // if( !googleCode ) {

        //     setState( 'isLoading', false );

        //     return;
        // }

        await bitcoinExchange.createUser({

            email: emailInput,
            password: passwordInput,
            // googleCode,
        });

        setState( 'isLoading', false );

        if( !!callback ) {

            callback();
        }
    }
    catch( err ) {

        console.log( 'the error:', err );
        console.log( 'the error keys:', Object.keys( err ) );

        setState( 'isLoading', false );

        alert(
            
            `error in creating user: ${
                
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
