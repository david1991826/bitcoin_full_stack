import { createElement as e } from 'react';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            width: 300,
            // height: 900,
            // backgroundColor: 'green',
            borderRadius: 25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            marginTop: 20,
            marginBottom: 20,
        },
    };
};


export default ({

    children

} = { children: null }) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        children
    );
};
