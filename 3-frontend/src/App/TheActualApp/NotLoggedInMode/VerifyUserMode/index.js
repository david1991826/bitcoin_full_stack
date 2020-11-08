import { createElement as e, useEffect } from 'react';
import { getState, setState } from '../../../reduxX';
import { story } from '../../../constants';
import {
    
    VerifyEmailPolygon,
    usefulComponents

} from '../../../TheSource';


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
    };
};


export default () => {

    useEffect( () => {

        return () => {

            setState({
    
                keys: [ 'ultraTools', 'fastMessageData' ],
                value: null
            });
        };

    }, [] );

    const isLoading = getState( 'isLoading' );

    const styles = getStyles();

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            usefulComponents.FastMessage,
            {
                marginTop: 20,
                marginBottom: 20,
            }
        ),
        e( VerifyEmailPolygon ),
        e(
            usefulComponents.Nav,
            {
                isLoadingMode: isLoading,
                marginTop: 100,
                marginBottom: 40,
                text: 'Home',
                onClick: () => {
    
                    setState(
                        [ 'notLoggedInMode', 'mainMode' ],
                        story.NotLoggedInMode.mainModes.initialChoiceMode
                    );
                },
            }
        )
    ];

    return e( ...createElementArguments );
};
