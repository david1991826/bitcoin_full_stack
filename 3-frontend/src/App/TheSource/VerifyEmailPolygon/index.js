import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import { validation } from '../../utils';
import { usefulComponents } from '../../TheSource';
import verifyEmailAndLogin from './verifyEmailAndLogin';


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

    const emailInput = getState( 'verifyEmailPolygon', 'emailInput' );
    const passwordInput = getState( 'verifyEmailPolygon', 'passwordInput' );
    const verifyEmailCodeInput = getState(
        'verifyEmailPolygon',
        'verifyEmailCodeInput'
    );
    const isLoading = getState( 'isLoading' );

    const powBlockIsActive = (

        !isLoading &&
        !!emailInput &&
        validation.isValidEmail( emailInput ) &&
        validation.isValidPassword( passwordInput ) &&
        (
            !!verifyEmailCodeInput &&
            (verifyEmailCodeInput.length > 5) &&
            (verifyEmailCodeInput.length < 500)
        )
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
                onChange: event => {

                    const newText = event.target.value;

                    if( newText.length > 200 ) {

                        return;
                    }

                    setState(
                        [
                            'verifyEmailPolygon',
                            'emailInput'
                        ],
                        newText.trim()
                    );
                },
                title: 'email',
                isLoadingMode: isLoading,
            }
        ),
        e(
            usefulComponents.WatermelonInput,
            {

                value: passwordInput,
                marginTop: 30,
                type: 'password',
                onChange: event => {

                    const newText = event.target.value;

                    if( newText.length > 200 ) {

                        return;
                    }

                    setState(
                        [
                            'verifyEmailPolygon',
                            'passwordInput'
                        ],
                        newText.trim()
                    );
                },
                title: 'password',
                isLoadingMode: isLoading,
            }
        ),
        // e(
        //     usefulComponents.WatermelonInput,
        //     {

        //         value: verifyEmailCodeInput,
        //         marginTop: 30,
        //         onChange: event => {

        //             const newText = event.target.value;

        //             if( newText.length > 200 ) {

        //                 return;
        //             }

        //             setState(
        //                 [
        //                     'verifyEmailPolygon',
        //                     'verifyEmailCodeInput'
        //                 ],
        //                 newText.trim()
        //             );
        //         },
        //         title: 'verificaton code',
        //         isLoadingMode: isLoading,
        //     }
        // ),
        e(
            usefulComponents.POWBlock,
            {
                text: 'Verify User and Login',
                isLoadingMode: !powBlockIsActive,
                marginTop: 60,
                onClick: async () => {

                    await verifyEmailAndLogin({

                        emailInput,
                        passwordInput,
                        verifyEmailCodeInput,
                    });
                },
            },
            'Verify User'
        )
    );
};
