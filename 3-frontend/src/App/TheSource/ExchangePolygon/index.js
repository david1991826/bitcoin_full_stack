import { createElement as e } from 'react';
import { getState, setState } from '../../reduxX';
import {
    WatermelonInput,
    POWBlock,
} from '../usefulComponents';
import { validation } from '../../utils';
import doExchange from './doExchange';


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
    const amountWantedInCryptos = getState( 'exchangePolygon', 'amountWantedInCryptos' );
    const amountWantedInBitcoin = getState( 'exchangePolygon', 'amountWantedInBitcoin' );

    const buttonIsDisabled = (

        isLoading ||
        !(
            (
                !!amountWantedInCryptos &&
                (Number( amountWantedInCryptos ) > 0)
            ) ||
            (
                !!amountWantedInBitcoin &&
                (Number( amountWantedInBitcoin ) > 0)
            )
        )
    );

    return e(
        'div',
        {
            style: styles.outerContainer,
        },
        e(
            WatermelonInput,
            {
                value: amountWantedInCryptos,
                // marginTop: 30,
                title: 'Amount Wanted in Cryptos',
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
                                    'exchangePolygon',
                                    'amountWantedInCryptos'
                                ],
                                value: text
                            },
                            {
                                keys: [
                                    'exchangePolygon',
                                    'amountWantedInBitcoin'
                                ],
                                value: ''
                            },
                        );
                    }
                },
            },
        ),
        e(
            WatermelonInput,
            {
                value: amountWantedInBitcoin,
                // marginTop: 30,
                title: 'Amount Wanted in Bitcoin',
                isLoadingMode: isLoading,
                onChange: event => {

                    const text = event.target.value;

                    const amountIsValid = validation.isValidNumberTextInput({

                        text
                    });

                    if( !!amountIsValid ) {

                        setState(
                            {
                                keys: [
                                    'exchangePolygon',
                                    'amountWantedInBitcoin'
                                ],
                                value: text
                            },
                            {
                                keys: [
                                    'exchangePolygon',
                                    'amountWantedInCryptos'
                                ],
                                value: ''
                            },
                        );
                    }
                },
            },
        ),
        e(
            POWBlock,
            {
                // backgroundColor: '',
                onClick: async () => {
    
                    await doExchange();
                },
                marginTop: 20,
                text: 'Exchange',
                isLoadingMode: buttonIsDisabled,
            }
        )
    );
};
