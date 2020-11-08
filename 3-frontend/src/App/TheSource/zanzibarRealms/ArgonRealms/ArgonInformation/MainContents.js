import { createElement as e } from 'react';
// import { setState } from '../../constants';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            width: '100%',
            backgroundColor: 'darkgreen',
            // height: 100,
            // backgroundColor: 'darkgreen',
            // borderRadius: 12,
            // padding: 20,
            // marginTop: 30,
            marginBottom: 30,
            marginTop: 18,
            height: 320,
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center',
            overflowY: 'scroll',
        },
    };
};


const getContentsStyles = ({

    isTopSection

}) => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );
    return {

        contentsSection: isTopSection ? {
        
            width: '100%',
            // height: 100,
            // borderRadius: 12,
            // padding: 20,
            marginTop: 0,
            // marginTop: 30,
            // display: 'flex',
            // flexDirection: 'flex-start',
            // justifyContent: 'center',
            // alignItems: 'center',
    
        } : {
            width: '100%',
            // height: 100,
            // borderRadius: 12,
            // padding: 20,
            marginTop: 17,
            marginBottom: 17,
            // marginTop: 30,
            // display: 'flex',
            // flexDirection: 'flex-start',
            // justifyContent: 'center',
            // alignItems: 'center',
        },

        titleText: {

            paddingTop: 5,
            paddingLeft: 18,
            paddingRight: 18,
            paddingBottom: 5,
            color: 'white',
            fontSize: 22,
            textAlign: 'left',
        },

        text: {

            paddingTop: 5,
            paddingLeft: 18,
            paddingRight: 18,
            paddingBottom: 5,
            color: 'white',
            fontSize: 18,
            textAlign: 'left',
            lineHeight: 1.3,
        }
    };
};


const Section = ({

    title,
    contents,
    isTopSection = false

}) => {

    const styles = getContentsStyles({

        isTopSection
    });

    return e(
        'div',
        {
            style: styles.contentsSection,
        },
        title && e(
            'div',
            {
                style: styles.titleText
            },
            title
        ),
        e(
            'div',
            {
                style: styles.text
            },
            contents
        )
    );
};


export default ({

    titleContentsAndMore = []

}) => {

    const styles = getStyles();

    const elementsToAdd = titleContentsAndMore.map( ({

        title,
        contents,

    }) => {

        return e(
            Section,
            {
                title,
                contents
            }
        );
    });

    return e(
        'div',
        {
            style: styles.outerContainer
        },
        ...elementsToAdd       
    );
};
