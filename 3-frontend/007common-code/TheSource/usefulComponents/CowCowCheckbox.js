import { createElement as e } from 'react';


const getStyles = ({

    marginTop,
    marginBottom,
    
}) => {
    
    return {

        metaOuterContainer: {

            width: '100%',
            marginTop,
            marginBottom,
            borderRadius: 20,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'darkGreen',
        },

        outerContainer: {
            borderRadius: 20,
            backgroundColor: 'green',
            width: '90%',
            // margin: 10,
            padding: 5,
            // height: 200,


            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: 'green',
        },

        checkbox: {

            marginLeft: 20,
            height: 20,
            width: 20,
        },

        textAndMore: {

            width: '74%',
            textAlign: 'left',
            color: 'white',
            fontSize: 18,
            padding: 20,

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: 20,
            userSelect: 'none',
        }
    };
};


export default ({

    isLoadingMode,
    text,
    marginTop = 0,
    marginBottom = 0,
    checked,
    onCheck,

}) => {

    const styles = getStyles({

        isLoadingMode,
        marginTop,
        marginBottom,
    });

    return e(
        'div',
        {
            style: styles.metaOuterContainer,
        },
        e(
            'div',
            {
                style: styles.outerContainer,
            },
            e(
                'input',
                {
                    disabled: isLoadingMode,
                    type: 'checkbox',
                    checked,
                    style: styles.checkbox,
                    onChange: onCheck,
                }
            ),
            e(
                'div',
                {
                    style: styles.textAndMore
                },
                text
            )
        ),
    );
};
