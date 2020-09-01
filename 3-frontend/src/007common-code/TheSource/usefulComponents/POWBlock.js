import { createElement as e } from 'react';


const getStyles = ({

    isLoadingMode,
    marginTop,
    marginBottom,
    borderRadius,
    backgroundColor,

}) => {
    
    return {

        outerContainer: {

            width: 300,
            marginTop,
            marginBottom,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        POW: {

            backgroundColor: isLoadingMode ? 'grey' : backgroundColor,
            borderRadius,
            width: '90%',
            padding: 20,
            userSelect: 'none',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        text: {

            color: 'white',
        },
    };
};


export default ({

    onClick,
    text,
    isLoadingMode,
    marginTop = 0,
    marginBottom = 0,
    borderRadius = 5,
    backgroundColor = 'green',

}) => {

    const styles = getStyles({

        isLoadingMode,
        marginTop,
        marginBottom,
        borderRadius,
        backgroundColor,
    });

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            'div',
            {
                style: styles.POW,
                onClick: isLoadingMode ? () => {} : onClick,
            },
            e(
                'div',
                {
                    style: styles.text,
                },
                text
            )
        )
    );
};
