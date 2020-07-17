import { createElement as e } from 'react';
import { getState, setState } from '../../../../reduxX';
import { WatermelonInput } from '../../../usefulComponents';
import { validation } from '../../../../utils';


export default () => {

    const isLoading = getState( 'isLoading' );
    const amount = getState( 'withdrawPolygon', 'amount' );
    const fullWithdraw = getState( 'withdrawPolygon', 'fullWithdraw' );

    const amountDisplay = String( amount );

    return e(
        WatermelonInput,
        {
            value: !!fullWithdraw ? '' : amountDisplay,
            title: 'Amount to Withdraw in BTC',
            borderRadius: 0,
            isLoadingMode: (
                isLoading ||
                fullWithdraw
            ),
            onChange: event => {
                    
                const text = event.target.value;

                const amountIsValid = validation.isValidNumberTextInput({

                    text,
                });
            
                if( amountIsValid ) {

                    setState( [ 'withdrawPolygon', 'amount' ], text );
                }
            },

        }
    );
};
