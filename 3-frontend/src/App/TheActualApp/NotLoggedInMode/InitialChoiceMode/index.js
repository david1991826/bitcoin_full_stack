import { createElement as e } from 'react';
import { setState, getState } from '../../../reduxX';
import { story } from '../../../constants';
import {

    usefulComponents

} from '../../../TheSource';
import Chaturanga from './Chaturanga';

const getStyles = () => {

    const {

        backgroundColor

    } = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor,
            // width: 300,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};



export default ({

    websiteName

}) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(

            usefulComponents.OmegaBorder,
            {
                websiteName
            },
            e(
                Chaturanga,
                {
                    onClick: () => {

                        setState(
                            ['notLoggedInMode', 'mainMode' ],
                            story.NotLoggedInMode.mainModes.signUpMode
                        );
                    },
                    text: 'Sign Up'
                }
            ),
            e(
                Chaturanga,
                {
                    onClick: () => {

                        setState(
                            ['notLoggedInMode', 'mainMode' ],
                            story.NotLoggedInMode.mainModes.loginMode
                        );
                    },
                    text: 'Login'
                }
            )
        )
    );
};
