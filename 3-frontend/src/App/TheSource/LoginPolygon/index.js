import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import { validation } from '../../utils';
import { usefulComponents } from '../../TheSource';
import login from './login';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: 300,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'white',
        },
    };
};


export default () => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );
    const emailInput = getState( 'loginPolygon', 'emailInput' );
    const passwordInput = getState( 'loginPolygon', 'passwordInput' );

    const powBlockIsActive = (

        !isLoading &&
        validation.isValidEmail( emailInput ) &&
        validation.isValidPassword( passwordInput )
    );

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            usefulComponents.WatermelonInput,
            {
                value: emailInput,
                marginTop: 30,
                title: 'email',
                isLoadingMode: isLoading,
                type: 'email',
                onChange: event => {

                    const newText = event.target.value;

                    if( newText.length > 200 ) {

                        return;
                    }

                    setState(
                        [
                            'loginPolygon',
                            'emailInput'
                        ],
                        newText.trim()
                    );
                },
            },
        ),
        e(
            usefulComponents.WatermelonInput,
            {
                value: passwordInput,
                marginTop: 30,
                title: 'password',
                type: 'password',
                isLoadingMode: isLoading,
                onChange: event => {

                    const newText = event.target.value;

                    if( newText.length > 200 ) {

                        return;
                    }

                    setState(
                        [
                            'loginPolygon',
                            'passwordInput'
                        ],
                        newText.trim()
                    );
                },
            }
        ),
        e(
            usefulComponents.POWBlock,
            {
                text: 'Login',
                isLoadingMode: !powBlockIsActive,
                marginTop: 60,
                onClick: async () => {

                    await login({

                        emailInput,
                        passwordInput,
                    });
                },
            }
        )
    );
};
