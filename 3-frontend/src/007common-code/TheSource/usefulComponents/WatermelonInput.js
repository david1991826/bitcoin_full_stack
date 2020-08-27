import { createElement as e } from 'react';


const getStyles = ({
    marginTop,
    marginBottom,
    isLoadingMode,
    borderRadius
}) => {
    
    return {

        outerContainer: {
            backgroundColor: 'darkgreen',
            width: 300,
            // height: 200,
            padding: 5,
            borderRadius,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'white',
            marginTop,
            marginBottom,
        },

        input: {
            backgroundColor: isLoadingMode ? 'grey' : 'green',

            height: 40,
            width: '90%',
            fontSize: 17,
            color: 'white',
            marginBottom: 8,
            padding: 10,
            border: 'none',
            borderRadius: 20,
        },

        title: {
            width: '90%',
            color: 'white',
            textAlign: 'left',
            fontSize: 18,
            marginTop: 8,
            marginBottom: 5,
        }
    };
};


export default ({

    value,
    type,
    onChange,
    title,
    marginTop = 0,
    marginBottom = 0,
    borderRadius = 25,
    isLoadingMode = false,

}) => {

    const styles = getStyles({
        marginTop,
        marginBottom,
        isLoadingMode,
        borderRadius,
    });

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            'div',
            {
                style: styles.title,
            },
            title
        ),
        e(
            'input',
            {
                disabled: isLoadingMode,
                style: styles.input,
                value,
                type,
                onChange,
            }
        )
    );
};
