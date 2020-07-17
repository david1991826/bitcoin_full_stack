import { createElement as e } from 'react';
import { getState } from '../../reduxX';
import WithdrawPolygonCore from './WithdrawPolygonCore';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: 300,
            marginTop: 90,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e( WithdrawPolygonCore )
    );
};
