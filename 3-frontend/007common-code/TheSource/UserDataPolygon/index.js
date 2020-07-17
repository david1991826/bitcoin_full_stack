import { createElement as e } from 'react';
import { getState } from '../../reduxX';
import { UltraDataContainer } from '../usefulComponents';


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            width: 300,

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
    };
};

const marginTop = 40;


export default () => {

    const styles = getStyles();

    const {

        // userId,
        email,
        balanceData,

    } = getState( 'loggedInMode', 'userData' );

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            UltraDataContainer,
            {
                text: `Email: ${ email }`,
                marginTop,
            }
        ),
        e(
            UltraDataContainer,
            {
                text: (
                    'Bitcoin Amount: ' +
                    balanceData.summary.bitcoin.totalAmount
                ),
                marginTop,
            }
        ),
        e(
            UltraDataContainer,
            {
                text: (
                    'Crypto Amount: ' +
                    balanceData.summary.crypto.totalAmount
                ),
                marginTop,
            }
        ),
        e(
            UltraDataContainer,
            {
                text: (
                    'Bitcoin Deposit Address: ' +
                    balanceData.bitcoin.depositAddress
                ),
                marginTop,
            }
        )
    );
};
