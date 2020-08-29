import { setState } from '../../reduxX';
import { bitcoinExchange, actions } from '../../utils';


export default async ({

    emailInput,
    passwordInput,

}) => {

    try {

        setState( 'isLoading', true );

        const {

            userId,
            loginToken

        } = await bitcoinExchange.login({

            email: emailInput,
            password: passwordInput,
        });

        actions.login({
            userId,
            loginToken,
        });

        setState( 'isLoading', false );
    }
    catch( err ) {


        setState(
            {
                keys: [ 'isLoading' ],
                value: false,
            },
            // {
            //     keys: [ 'loginPolygon', 'emailInput' ],
            //     value: ''
            // },
            {
                keys: [ 'loginPolygon', 'passwordInput' ],
                value: ''
            },
        );

        console.log( 'the error:', err );

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
