import { createElement as e } from 'react';

const getStyles = ({

    marginTop,
    marginBottom,

}) => {
    
    return {

        outerContainer: {

            width: 300,
            marginTop,
            marginBottom,
            backgroundColor: 'green',
            borderRadius: 20,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        text: {

            width: 260,
            textAlign: 'left',
            wordBreak: 'break-word',
            // padding: 20,
            margin: 20,
            fontSize: 18,
        }
    };
};


export default ({

    text,
    marginTop = 0,
    marginBottom = 0,

}) => {

    const styles = getStyles({

        marginTop,
        marginBottom,
        
    });

    return e(
        'div',
        {
            style: styles.outerContainer,
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