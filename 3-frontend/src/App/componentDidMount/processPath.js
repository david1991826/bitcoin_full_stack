import { browser, validation } from '../utils';
import { setState } from '../reduxX';
import { pathValues, story } from '../constants';


export default () => {

    const url = window.location.href;

    const formattedPathName = (
        
        browser.getParsedUrl( url ).pathname.substring( 1 )
    );

    if( !formattedPathName ) {

        return;
    }

    const splitPath = formattedPathName.split( '/' );

    if( splitPath[ splitPath.length - 1 ] === '' ) {

        splitPath.pop();
    }

    // https://localhost:42069/account_verification/fake-account-verification-code/email/john@smith.com
    if(
        (splitPath[0] === pathValues.mode) &&
        (splitPath[1] === pathValues.account_verification) &&
        (splitPath.length === 6) &&
        (splitPath[2] === pathValues.verification_code) &&
        (
            (splitPath[3].length > 5) &&
            (splitPath[3].length < 500)
        ) &&
        (splitPath[4] === pathValues.email) &&
        validation.isValidEmail( splitPath[5] )
    ) {
        
        window.history.replaceState(
            {
                key: 'exchange'
            },
            document.title,
            '/'
        );

        const verificationCode = splitPath[3];
        const email = splitPath[5];

        setState(
            {
                keys: [ 'verifyEmailPolygon', 'emailInput' ],
                value: email,
            },
            {
                keys: [ 'verifyEmailPolygon', 'verifyEmailCodeInput' ],
                value: verificationCode,
            },
            {
                keys: [ 'notLoggedInMode', 'mainMode' ],
                value: story.NotLoggedInMode.mainModes.verifyUserMode
            }
        );
    }
};