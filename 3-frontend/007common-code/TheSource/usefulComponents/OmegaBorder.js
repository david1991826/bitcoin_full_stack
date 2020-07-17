import { createElement as e } from 'react';
import { getState } from '../../reduxX';
import TitlePolygon from '../TitlePolygon';
import CoolInfoPolygon from '../CoolInfoPolygon';


const getStyles = () => {

    const {

        backgroundColor

    } = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor,
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};


export default ({

    websiteName,
    children

}) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            TitlePolygon,
            {
                websiteName
            }
        ),
        children,
        e( CoolInfoPolygon )
    );
};
