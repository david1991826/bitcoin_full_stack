// import { getState, setState } from '../../reduxX';
import { actions } from '../../utils';
// import { story } from '../../constants';


export default async () => {

    try {

        await actions.refreshUserData();
    }
    catch( err ) {

        console.log( 'error getting user data', err );

        actions.signOut();
    }
};
