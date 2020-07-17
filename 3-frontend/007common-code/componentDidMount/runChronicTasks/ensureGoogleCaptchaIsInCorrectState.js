import { getState } from '../../reduxX';
import { grecaptcha, actions } from '../../utils';
import { story } from '../../constants';


export default async () => {

    const isOnSignUpPage = (
        !actions.getIsLoggedIn() &&
        (
            getState( 'notLoggedInMode', 'mainMode' ) ===
            story.NotLoggedInMode.mainModes.signUpMode
        )
    );

    const isOnGoogleCaptchaEnabledPage = (

        isOnSignUpPage
    );

    if( isOnGoogleCaptchaEnabledPage ) {

        grecaptcha.showGrecaptcha();
    }
    else {

        await grecaptcha.hideGrecaptcha({

            shouldOnlyTryOnce: true
        });
    }
};
