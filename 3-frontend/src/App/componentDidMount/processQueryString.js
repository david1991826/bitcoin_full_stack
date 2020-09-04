import { browser } from '../utils';
import { setState } from '../reduxX';
import { queryStringModes, story } from '../constants';

const { getQueryStringValue } = browser;


export default () => {

    const mode = getQueryStringValue( 'mode' );
    const verificationCode = getQueryStringValue( 'verification_code' );
    const email = getQueryStringValue( 'email' );

    if(
        (mode === queryStringModes.account_verification) &&
        !!verificationCode &&
        !!email
    ) {

        window.history.replaceState(
            {
                key: 'exchange'
            },
            document.title,
            '/'
        );

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