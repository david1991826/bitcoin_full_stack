import { createElement as e } from 'react';
import CloseButton from './CloseButton';
import MainContents from './MainContents';
// import { getState/*, setState*/ } from '../../reduxX';
// import { bitcoinExchange } from '../../utils';
// import LuluLemonButton from './LuluLemonButton';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            width: 300,
            // height: 450,
            backgroundColor: 'green',
            borderRadius: 25,
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 30,
        },

        topBar: {
            width: '83%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            marginTop: 16,
        },

        titleText: {
            fontSize: 22,
        },

        secondBar: {
            width: '83%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        secondText: {
            
            width: '100%',
            textAlign: 'left',
            fontSize: 16,
        },
    };
};


export default ({

    title,
    titleContentsAndMore,
    lastUpdatedDate,

}) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            'div',
            {
                style: styles.topBar,
            },
            e(
                'h1',
                {
                    style: styles.titleText,
                },
                title
            ),
            e( CloseButton )
        ),
        e(
            'div',
            {
                style: styles.secondBar,
            },
            e(
                'div',
                {
                    style: styles.secondText,
                },
                `Last Updated: ${ lastUpdatedDate }`
            )
        ),
        e(
            MainContents,
            {
                titleContentsAndMore,
            }
        )
    );
};
