import { createElement as e } from 'react';
import CowCowCheckbox from '../../../usefulComponents/CowCowCheckbox';
import { getState, setState } from '../../../../reduxX';


const getStyles = () => {
    
    return {

        outerContainer: {
            backgroundColor: 'darkGreen',

            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};


export default () => {

    const styles = getStyles();

    const isLoading = getState( 'isLoading' );
    const fullWithdraw = getState( 'withdrawPolygon', 'fullWithdraw' );

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            CowCowCheckbox,
            {
                isLoadingMode: isLoading,
                text: 'Withdraw Full Amount',
                marginTop: 0,
                marginBottom: 0,
                checked: fullWithdraw,
                onCheck: event => {

                    setState(
                        [
                            'withdrawPolygon',
                            'fullWithdraw'
                        ],
                        event.target.checked
                    );
                },
            }
        )
    );
};
