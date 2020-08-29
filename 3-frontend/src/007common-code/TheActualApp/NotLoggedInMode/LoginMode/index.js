import { createElement as e } from 'react';
import { getState, setState } from '../../../reduxX';
import { story } from '../../../constants';
import { LoginPolygon, usefulComponents } from '../../../TheSource';


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

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        },
        e( LoginPolygon ),
        e(
            usefulComponents.Nav,
            {
                text: 'Home',
                onClick: () => {

                    setState(
                        [ 'notLoggedInMode', 'mainMode' ],
                        story.NotLoggedInMode.mainModes.initialChoiceMode
                    );
                },
                marginTop: 100,
                marginBottom: 40,
                isLoadingMode: isLoading,
            }
        )
    ];

    return e( ...createElementArguments );
};
