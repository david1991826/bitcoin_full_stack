import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import {
    usefulComponents,
    // POWBlock,
} from '../../TheSource';
import { validation } from '../../utils';
import doEnchantedLuck from './doEnchantedLuck';
// import doExchange from './doExchange';


const getStyles = () => {
    
    // const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: 'darkgreen',
            // width: 300,
            marginTop: 90,
            // height: 300,
            // borderRadius: '50%',
            // backgroundColor: 'pink',

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
    const amount = getState( 'coinExperiencePolygon', 'amount' );

    const buttonIsDisabled = !(
        !isLoading &&
        !!amount &&
        (Number( amount ) > 0)
    );

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            usefulComponents.WatermelonInput,
            {
                value: amount,
                // marginTop: 30,
                title: 'Luck Amount in Cryptos',
                isLoadingMode: isLoading,
                onChange: event => {

                    const text = event.target.value;

                    const amountIsValid = validation.isValidNumberTextInput({

                        text,
                        maxAmount: 69000,
                        allowedNumberOfDecimals: 5
                    });

                    if( !!amountIsValid ) {

                        setState(
                            {
                                keys: [
                                    'coinExperiencePolygon',
                                    'amount'
                                ],
                                value: text
                            }
                        );
                    }
                },
            },
        ),
        e(
            usefulComponents.POWBlock,
            {
                onClick: async () => {
    
                    await doEnchantedLuck();
                },
                text: 'Luck',
                isLoadingMode: buttonIsDisabled,
                marginTop: 10,
            }
        )
    );
};
