import { createElement as e } from 'react';


const getStyles = () => {
    
    return {

        chaturanga: {

            width: '100%',
            height: 200,
            backgroundColor: '#009107',
            borderRadius: 30,
            marginTop: 10,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
        },

        text: {

            textAlign: 'center',
            color: 'white',
            fontSize: 20,
        }
    };
};


export default ({

    onClick,
    text

}) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.chaturanga,
            onClick,
        },
        e(
            'div',
            {
                style: styles.text,
            },
            text
        )
    );
};
