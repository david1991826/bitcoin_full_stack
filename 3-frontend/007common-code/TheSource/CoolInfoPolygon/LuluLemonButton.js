import { createElement as e } from 'react';
// import { getState/*, setState*/ } from '../../reduxX';
// import { bitcoinExchange } from '../../utils';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        luluLemonButtons: {
            width: '85%',
            height: 40,
            // margin: 20,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            // margin: 20,
            // margin: 20,
            padding: 5,
            backgroundColor: 'darkgreen',
            // backgroundColor: '#FF9900',
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        theText: {
            color: 'beige',
            userSelect: 'none',
        }
    };
};


export default ({

    text,
    onClick

}) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.luluLemonButtons,
            onClick,
        },
        e(
            'div',
            {
                style: styles.theText,
            },
            text
        )
    );
};
