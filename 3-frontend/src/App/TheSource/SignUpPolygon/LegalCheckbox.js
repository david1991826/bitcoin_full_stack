import { createElement as e } from 'react';


const getStyles = ({

    marginTop,
    marginBottom,
    
}) => {
    
    return {

        metaOuterContainer: {

            width: 300,
            marginTop,
            marginBottom,
            borderRadius: 20,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'green',
        },

        outerContainer: {
            // backgroundColor: mainStyleObject.backgroundColor,
            width: '100%',
            padding: 10,
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

            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: 20,
            userSelect: 'none',
        },

        fakeLinkText: {

            textAlign: 'left',
            color: 'blue',
            textDecoration: 'underline',
            fontSize: 18,
            marginLeft: 5,
            userSelect: 'none',
        },
    };
};


export default ({

    isLoadingMode,
    text,
    linkText,
    marginTop = 0,
    marginBottom = 0,
    checked,
    onLinkClick,
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
                text,
                e(
                    'div',
                    {
                        style: styles.fakeLinkText,
                        onClick: onLinkClick,
                    },
                    linkText
                )
            )
        ),
    );
};
