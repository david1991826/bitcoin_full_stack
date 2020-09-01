import getIsLoggedIn from './getIsLoggedIn';
import { getState } from '../../reduxX';
import { story } from '../../constants';


export default () => {

    const metaMode = getState( 'metaMode' );

    if(
        !!metaMode &&
        (metaMode !== story.metaModes.zeroPointEnergy)
    ) {

        return false;
    }

    const isLoggedIn = getIsLoggedIn();

    if( isLoggedIn ) {

        const thereIsUserData = !!getState( 'loggedInMode', 'userData' );

        if( thereIsUserData ) {

            return true;
        }

        return false;
    }

    const notLoggedInMode = getState( 'notLoggedInMode', 'mainMode' );

    if(
        !notLoggedInMode ||
        (
            notLoggedInMode ===
            story.NotLoggedInMode.mainModes.initialChoiceMode
        )
    ) {

        return true;
    }

    return false;
};
