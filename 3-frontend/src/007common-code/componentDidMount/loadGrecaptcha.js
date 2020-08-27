import { grecaptchaCode } from '../constants';

const renderCaptchaUrl = (
    `https://www.google.com/recaptcha/api.js?render=${ grecaptchaCode }`
);


export default () => {

    try {

        const scriptElement = document.createElement( 'script' );

        scriptElement.src = renderCaptchaUrl;

        const body = document.getElementsByTagName( 'head' )[0];

        body.appendChild( scriptElement );
    }
    catch( err ) {

        console.log( 'error in loading google:', err );
    }
};