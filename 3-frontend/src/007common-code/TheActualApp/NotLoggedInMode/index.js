import { createElement as e } from 'react';
import { getState } from '../../reduxX';
import InitialChoiceMode from './InitialChoiceMode';
import LoginMode from './LoginMode';
import SignUpMode from './SignUpMode';
import AfterSignUpMode from './AfterSignUpMode';
import VerifyUserMode from './VerifyUserMode';
import { story } from '../../constants';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: 300,
            // height: 200,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
        },
    };
};


export default ({

    websiteName
    
}) => {

    const styles = getStyles();

    const mainMode = getState( 'notLoggedInMode', 'mainMode' );

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        }
    ];

    if( mainMode === story.NotLoggedInMode.mainModes.signUpMode ) {

        createElementArguments.push(

            e( SignUpMode )
        );
    }
    else if( mainMode === story.NotLoggedInMode.mainModes.loginMode ) {

        createElementArguments.push(

            e( LoginMode )
        );
    }
    else if( mainMode === story.NotLoggedInMode.mainModes.afterSignUpMode ) {

        createElementArguments.push(

            e(
                AfterSignUpMode,
                {
                    websiteName
                }
            )
        );
    }
    else if( mainMode === story.NotLoggedInMode.mainModes.verifyUserMode ) {

        createElementArguments.push(

            e( VerifyUserMode )
        );
    }
    else {

        createElementArguments.push(

            e(
                InitialChoiceMode,
                {
                    websiteName
                }
            )
        );
    }

    return e( ...createElementArguments );
};
