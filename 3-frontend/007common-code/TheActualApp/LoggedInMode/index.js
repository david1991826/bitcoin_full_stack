import { createElement as e, useEffect } from 'react';
import { getState } from '../../reduxX';
import getUserData from './getUserData';
import {
    UserDataPolygon,
    WithdrawPolygon,
    SignOutButton,
    LoadingPage,
    DeleteUserButton,
    ExchangePolygon,
} from '../../TheSource';
import {
    CoinExperiencePolygon,
} from '../../TheEnchantedSource';
// import { story } from '../../constants';


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

    safeMode,

}) => {

    useEffect( () => {

        getUserData();

    }, [] );

    const styles = getStyles();

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        }
    ];

    const userData = getState( 'loggedInMode', 'userData' );

    if( !!userData ) {

        createElementArguments.push(

            e( UserDataPolygon )
            // e( CoinExperiencePolygon ),
        );

        if( !safeMode ) {

            createElementArguments.push(

                e( CoinExperiencePolygon ),
            );  
        }

        createElementArguments.push(

            e( WithdrawPolygon ),
            e( ExchangePolygon ),
            e( SignOutButton ),
            e( DeleteUserButton )
        );
    }
    else {

        createElementArguments.push(
            
            e( LoadingPage )
        );
    }

    return e( ...createElementArguments );
};
