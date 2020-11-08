import { google } from '../../constants';

export default () => {

    const captcha = document.getElementsByClassName(
        google.grecapcha.badgeClassName
    )[0];

    if(
        !!captcha &&
        (captcha.style.visibility !== 'visible')
    ) {

        captcha.style.visibility = 'visible';
    }
};