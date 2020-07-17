import { createElement as e } from 'react';
import { setState } from '../../reduxX';
import { story } from '../../constants';
// import { bitcoinExchange } from '../../utils';
import LuluLemonButton from './LuluLemonButton';


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
            marginTop: 40,
            marginBottom: 30,
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
            userSelect: 'none',
        }
    };
};


export default () => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            LuluLemonButton,
            {
                text: 'Privacy Policy',
                onClick: () => {

                    setState( 'metaMode', story.metaModes.privacyPolicy );
                },
            }
        ),
        e(
            LuluLemonButton,
            {
                text: 'Terms Of Service',
                onClick: () => {

                    setState( 'metaMode', story.metaModes.termsOfService );
                },
            }
        )
    );
};
