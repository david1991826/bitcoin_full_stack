import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import { mainStyles, mainStyleToMainStyleObject } from '../../constants';


const getStyles = () => {
    
    return {

        outerContainer: {
            backgroundColor: 'blue',
            width: 25,
            height: 25,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer,
            onClick: () => {

                const {

                    mainStyle

                } = getState( 'mainStyleObject' );

                if( mainStyle === mainStyles.light ) {

                    setState(
                        [ 'mainStyleObject' ],
                        mainStyleToMainStyleObject[ mainStyles.dark ]
                    );
                }
                else {

                    setState(
                        [ 'mainStyleObject' ],
                        mainStyleToMainStyleObject[ mainStyles.light ]
                    );
                }
            }
        }
    );
};
