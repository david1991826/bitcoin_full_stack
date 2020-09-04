import { createElement as e, useEffect } from 'react';
import { getState } from '../reduxX';
import { actions } from '../utils';
import getLoginCredentialsFromLocalStorage from './getLoginCredentialsFromLocalStorage';
import NotLoggedInMode from './NotLoggedInMode';
import LoggedInMode from './LoggedInMode';
// import ColourSwitcher from '../TheSource/usefulComponents/ColourSwitcher';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            // backgroundColor: 'lightblue',
            width: '100%',
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

    websiteName,
    safeMode,

}) => {

    useEffect( () => {

        getLoginCredentialsFromLocalStorage();

    }, [] );

    const styles = getStyles();

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        },
    ];

    const isLoggedIn = actions.getIsLoggedIn();

    if( isLoggedIn ) {

        createElementArguments.push(
            e(
                
                LoggedInMode,
                {
                    safeMode,
                }
            )
        );
    }
    else {

        createElementArguments.push(
            e(
                NotLoggedInMode,
                {
                    websiteName
                }
            )
        );
    }

    return e( ...createElementArguments );
};
