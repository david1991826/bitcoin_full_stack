import { getState } from '../../reduxX';


export default () => {

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    if(
        !!userId &&
        !!loginToken
    ) {

        return true;        
    }

    return false;
};
