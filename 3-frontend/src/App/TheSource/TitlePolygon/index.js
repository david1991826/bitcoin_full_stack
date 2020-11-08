import { createElement as e } from 'react';
// import { setState } from '../../reduxX';
import { actions } from '../../utils';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            width: 300,
            backgroundColor: 'green',
            borderRadius: 25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'white',
            marginTop: 10,
            marginBottom: 40,
        },

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
            fontSize: 24,
        }
    };
};


export default ({

    websiteName,

}) => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
            onClick: () => {

                actions.goToHomePage();

                // setState(
                //     {
                //         keys: [ 'metaMode' ],
                //         value: null
                //     },
                //     {
                //         keys: [ 'notLoggedInMode', 'mainMode' ],
                //         value: null
                //     }
                // );
            },
        },
        e(
            'div',
            {
                style: styles.luluLemonButtons,
            },
            e(
                'h1',
                {
                    style: styles.theText,
                },
                websiteName
            )
        )
    );
};
