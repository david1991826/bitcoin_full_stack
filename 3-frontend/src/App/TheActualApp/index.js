import { createElement as e, useEffect } from 'react';
import { getState } from '../reduxX';
import getLoginCredentialsFromLocalStorage from './getLoginCredentialsFromLocalStorage';
import NotLoggedInMode from './NotLoggedInMode';
// import LoggedInMode from './LoggedInMode';
// import ColourSwitcher from '../TheSource/usefulComponents/ColourSwitcher';


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

    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    const hasLoggedInCredentials = (
        !!userId &&
        !!loginToken
    );

    if( hasLoggedInCredentials ) {

        // createElementArguments.push(
        //     e(
                
        //         LoggedInMode,
        //         {
        //             safeMode,
        //         }
        //     )
        // );
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
