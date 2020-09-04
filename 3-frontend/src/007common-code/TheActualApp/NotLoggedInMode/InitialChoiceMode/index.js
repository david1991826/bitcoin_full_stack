import { createElement as e } from 'react';
import { setState } from '../../../reduxX';
import { story } from '../../../constants';
import {

    usefulComponents

} from '../../../TheSource';
import Chaturanga from './Chaturanga';


// const getStyles = () => {
    
//     return {

//     };
// };


export default ({

    websiteName

}) => {

    // const styles = getStyles();

    return e(

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
    );
};
