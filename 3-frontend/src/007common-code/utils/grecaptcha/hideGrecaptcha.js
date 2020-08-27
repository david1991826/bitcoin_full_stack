import { google } from '../../constants';
import delay from '../delay';

const hideGrecaptcha = async ({

    iterationCount = 0, 
    shouldOnlyTryOnce = false

} = {
    
    iterationCount: 0,
    shouldOnlyTryOnce: false

}) => {

    const captcha = document.getElementsByClassName(
        google.grecapcha.badgeClassName
    )[0];

    if(
        !!captcha &&
        (captcha.style.visibility !== 'hidden')
    ) {

        captcha.style.visibility = 'hidden';

        return;
    }
    else if(
        shouldOnlyTryOnce ||
        (iterationCount > 20)
    ) {

        return;
    }

    await delay({ timeout: 100 });

    return await hideGrecaptcha({

        iterationCount: iterationCount + 1, 
    });
};


export default hideGrecaptcha;