import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import { bitcoinExchange, stringify } from '../../utils';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: 300,
            height: 200,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'white',
        },

        input: {

            width: '90%',
        },

        loginButton: {

            backgroundColor: 'green',
            borderRadius: 5,
            width: '75%',
            padding: 20,
        }
    };
};


export default () => {

    const styles = getStyles();

    const userIdInput = getState( 'getUserPolygon', 'userIdInput' );
    const loginTokenInput = getState( 'getUserPolygon', 'loginTokenInput' );

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            'input',
            {
                style: styles.input,
                value: userIdInput,
                onChange: event => {

                    const newText = event.target.value;

                    if( newText.length > 200 ) {

                        return;
                    }

                    setState(
                        [
                            'getUserPolygon',
                            'userIdInput'
                        ],
                        newText.trim()
                    );
                },
            }
        ),
        e(
            'input',
            {
                style: styles.input,
                value: loginTokenInput,
                onChange: event => {

                    const newText = event.target.value;

                    if( newText.length > 300 ) {

                        return;
                    }

                    setState(
                        [
                            'getUserPolygon',
                            'loginTokenInput'
                        ],
                        newText.trim()
                    );
                },
            }
        ),
        e(
            'div',
            {
                style: styles.loginButton,
                onClick: async () => {

                    try {

                        const user = await bitcoinExchange.getUser({

                            userId: userIdInput,
                            loginToken: loginTokenInput,
                        });

                        console.log(
                            'got user:',
                            stringify( user )
                        );

                        alert(
                            'successfully got user'
                        );
                    }
                    catch( err ) {

                        console.log( 'the error:', Object.keys( err ) );

                        alert(
                            
                            `error in getting user: ${
                                (
                                    !!err &&
                                    !!err.response &&
                                    !!err.response.data &&
                                    !!err.response.data.message &&
                                    err.response.data.message

                                ) || 'internal server error'
                            }`
                        );                        
                    }
                },
            },
            'Get User'
        )
    );
};
