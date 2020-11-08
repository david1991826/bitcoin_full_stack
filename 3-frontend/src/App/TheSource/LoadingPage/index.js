import { createElement as e } from 'react';
import { getState } from '../../reduxX';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            // backgroundColor: 'pink',
            width: 300,
            height: 350,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        triangle: {
            width: 0,
            height: 0, 
            borderLeft: '90px solid transparent',
            borderRight: '90px solid transparent',
            borderTop: '150px solid green',
        }
    };
};


export default () => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            'div',
            {
                style: styles.triangle
            }
        )
    );
};
