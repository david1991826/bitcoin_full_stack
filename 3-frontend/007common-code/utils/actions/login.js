import { setState } from '../../reduxX';


export default ({

    userId,
    loginToken,
    
}) => {

    localStorage.setItem( 'userId', userId );
    localStorage.setItem( 'loginToken', loginToken );

    setState(
        {
            keys: [ 'auth', 'userId' ],
            value: userId
        },
        {
            keys: [ 'auth', 'loginToken' ],
            value: loginToken
        },
    );
};
