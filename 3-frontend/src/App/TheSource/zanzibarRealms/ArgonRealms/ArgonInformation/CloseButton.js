import { createElement as e } from 'react';
import { setState } from '../../../../reduxX';
import { story } from '../../../../constants';
// import LuluLemonButton from './LuluLemonButton';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            width: 69,
            height: 40,
            backgroundColor: 'darkgreen',
            borderRadius: 12,
            // marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        text: {

            color: 'white',
            fontSize: 18,
            userSelect: 'none',
        }
    };
};


export default () => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
            onClick: () => {

                setState( 'metaMode', story.metaModes.zeroPointEnergy );
            }
        },
        e(
            'div',
            {
                style: styles.text,
            },
            'Back'
        )
    );
};
