import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import { validation } from '../../utils';
import { story } from '../../constants';
import { WatermelonInput, POWBlock } from '../usefulComponents';
import LegalCheckbox from './LegalCheckbox';
import signUp from './signUp';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );
    const isLoading = getState( 'isLoading' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: 300,
            // height: 200,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'white',
        },

        input: {

            width: '90%',
        },

        loginButton: {

            backgroundColor: isLoading ? 'grey' : 'green',
            borderRadius: 5,
            width: '75%',
            padding: 20,
            userSelect: 'none',
        }
    };
};


export default ({

    callback,

}) => {

    const styles = getStyles();

    const emailInput = getState( 'signUpPolygon', 'emailInput' );
    const passwordInput = getState( 'signUpPolygon', 'passwordInput' );
    const reTypePasswordInput = getState( 'signUpPolygon', 'reTypePasswordInput' );
    const isLoading = getState( 'isLoading' );
    const agreeToTermsOfService = getState( 'signUpPolygon', 'agreeToTermsOfService' );
    const agreeToPrivacyPolicy = getState( 'signUpPolygon', 'agreeToPrivacyPolicy' );

    const itIsOkayToMakeASignUpRequestRightNow = (

        !isLoading &&
        validation.isValidEmail( emailInput ) &&
        validation.isValidPassword( passwordInput ) &&
        (passwordInput === reTypePasswordInput) &&
        agreeToTermsOfService &&
        agreeToPrivacyPolicy
    );

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            WatermelonInput,
            {
                isLoadingMode: isLoading,
                marginTop: 30,
                value: emailInput,
                title: 'email',
                type: 'email',
                onChange: event => {

                    const newText = event.target.value;

                    if( newText.length > 200 ) {

                        return;
                    }

                    setState(
                        [
                            'signUpPolygon',
                            'emailInput'
                        ],
                        newText.trim()
                    );
                },
            }
        ),
        e(
            WatermelonInput,
            {
                marginTop: 30,
                isLoadingMode: isLoading,
                title: 'password',
                value: passwordInput,
                type: 'password',
                onChange: event => {

                    const newText = event.target.value;

                    if( newText.length > 200 ) {

                        return;
                    }

                    setState(
                        [
                            'signUpPolygon',
                            'passwordInput'
                        ],
                        newText.trim()
                    );
                },
            }
        ),
        e(
            WatermelonInput,
            {
                marginTop: 30,
                isLoadingMode: isLoading,
                title: 'retype password',
                value: reTypePasswordInput,
                type: 'password',
                onChange: event => {

                    const newText = event.target.value;

                    if( newText.length > 200 ) {

                        return;
                    }

                    setState(
                        [
                            'signUpPolygon',
                            'reTypePasswordInput'
                        ],
                        newText.trim()
                    );
                },
            }
        ),
        e(
            LegalCheckbox,
            {
                isLoadingMode: isLoading,
                text: 'Agree to the ',
                linkText: 'Terms of Service',
                marginTop: 60,
                checked: agreeToTermsOfService,
                onCheck: event => {

                    setState(
                        [
                            'signUpPolygon',
                            'agreeToTermsOfService'
                        ],
                        event.target.checked
                    );
                },
                onLinkClick: () => {

                    setState(
                        
                        'metaMode',
                        story.metaModes.termsOfService
                    );
                },
            },
        ),
        e(
            LegalCheckbox,
            {
                isLoadingMode: isLoading,
                text: 'Agree to the ',
                linkText: 'Privacy Policy',
                marginTop: 20,
                checked: agreeToPrivacyPolicy,
                onCheck: event => {

                    setState(
                        [
                            'signUpPolygon',
                            'agreeToPrivacyPolicy'
                        ],
                        event.target.checked
                    );
                },
                onLinkClick: () => {

                    setState(
                        
                        'metaMode',
                        story.metaModes.privacyPolicy
                    );
                },
            },
        ),
        e(
            POWBlock,
            {
                marginTop: 60,
                // style: styles.loginButton,

                isLoadingMode: !itIsOkayToMakeASignUpRequestRightNow,
                onClick: async () => {

                    await signUp({

                        isLoading,
                        emailInput,
                        passwordInput,
                        callback,
                    });
                },
                text: 'Sign Up'
            }
        )
    );
};
