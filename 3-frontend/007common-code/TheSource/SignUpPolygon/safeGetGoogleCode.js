import { grecaptchaCode } from '../../constants';

export default () => new Promise( (

    resolve

) => {

    try {

        window.grecaptcha.ready( async () => {

            try{
                
                const token = await window.grecaptcha.execute(
                
                    grecaptchaCode,
                    { action: 'submit' }
                );

                resolve( token );
            }
            catch( err ) {

                resolve();
            }
        });
    }
    catch( err ) {

        resolve();
    }
});