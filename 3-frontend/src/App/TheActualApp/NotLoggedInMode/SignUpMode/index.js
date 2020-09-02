import { createElement as e/*, useEffect*/ } from 'react';
import { getState, setState } from '../../../reduxX';
import { story } from '../../../constants';
import { usefulComponents } from '../../../TheSource';
import SignUpPolygon from '../../../TheSource/SignUpPolygon';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: 300,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
        },

        backButton: {
            backgroundColor: 'beige',
            margin: 15,
            borderRadius: 20,
            width: '75%',
            height: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        text: {

            textAlign: 'center',
            color: 'black',
            fontSize: 20,
        }
    };
};


export default () => {

    // useEffect( () => {

        // window.history.pushState(
        //     {
        //         page: 'signUpMode'
        //     },
        //     'signUpMode'
        // );
        
    // }, [] );

    const styles = getStyles();

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            SignUpPolygon,
            {
                callback: () => {

                    const email = getState( 'signUpPolygon', 'emailInput' );
                        
                    setState(
                        {
                            keys: [ 'notLoggedInMode', 'mainMode' ],
                            value: (
                                
                                story.NotLoggedInMode.mainModes.afterSignUpMode
                            ),
                        },
                        {
                            keys: [ 'ultraTools', 'fastMessageData' ],
                            value: {
                                message: (
                                    `To login, please check your email: ${ email } ` +
                                    'for a verification code link. Thank you!'
                                ),
                                timeout: 9999999,
                                noX: true
                            },
                        },
                        {
                            keys: [ 'signUpPolygon', 'emailInput' ],
                            value: '',
                        },
                        {
                            keys: [ 'signUpPolygon', 'passwordInput' ],
                            value: '',
                        },
                        {
                            keys: [ 'signUpPolygon', 'agreeToTermsOfService' ],
                            value: null,
                        },
                        {
                            keys: [ 'signUpPolygon', 'agreeToPrivacyPolicy' ],
                            value: null,
                        },
                    );
                }
            }
        ),
        e(
            usefulComponents.Nav,
            {
                marginTop: 50,
                marginBottom: 40,
                isLoadingMode: getState( 'isLoading' ),
                onClick: () => {

                    setState(
                        [ 'notLoggedInMode', 'mainMode' ],
                        story.NotLoggedInMode.mainModes.initialChoiceMode
                    );
                },
                text: 'Home',
            }
        )//,
        // e(
        //     usefulComponents.Nav,
        //     {
        //         isLoadingMode: getState( 'isLoading' ),
        //         marginTop: 30,
        //         onClick: () => {

        //             setState(
        //                 [ 'notLoggedInMode', 'mainMode' ],
        //                 story.NotLoggedInMode.mainModes.verifyUserMode
        //             );
        //         },
        //         text: 'Verify User Email Code',
        //     }    
        // )
    ];

    return e( ...createElementArguments );
};
