import { setState } from '../reduxX';
import { actions } from '../utils';


export default () => {

    if( actions.getIsLoggedIn() ) {

        return;
    }

    const userId = localStorage.getItem( 'userId' );
    const loginToken = localStorage.getItem( 'loginToken' );

    if(
        !!userId &&
        !!loginToken
    ) {

        setState(
            {
                keys: [ 'auth', 'userId' ],
                value: userId
            },
            {
                keys: [ 'auth', 'loginToken' ],
                value: loginToken
            }
        );
    }
};
