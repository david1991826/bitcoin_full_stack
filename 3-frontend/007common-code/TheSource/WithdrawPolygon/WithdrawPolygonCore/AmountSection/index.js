import { createElement as e } from 'react';
import { getState } from '../../../../reduxX';
import AmountInput from './AmountInput';
import FullWithdrawSelect from './FullWithdrawSelect';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};


export default () => {

    const styles = getStyles();

    return e(
        'div',
        {
            style: styles.outerContainer
        },
        e( AmountInput ),
        e( FullWithdrawSelect )
    );
};
