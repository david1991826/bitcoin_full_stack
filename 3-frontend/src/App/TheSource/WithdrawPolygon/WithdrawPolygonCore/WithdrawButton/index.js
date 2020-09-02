import { createElement as e } from 'react';
import { getState } from '../../../../reduxX';
import { POWBlock } from '../../../usefulComponents';
import { actions } from '../../../../utils';
import withdrawBitcoin from './withdrawBitcoin';


export default () => {

    const isLoading = getState( 'isLoading' );

    const amount = getState( 'withdrawPolygon', 'amount' );
    const address = getState( 'withdrawPolygon', 'address' );
    const fullWithdraw = getState( 'withdrawPolygon', 'fullWithdraw' );
    const userId = getState( 'auth', 'userId' );
    const loginToken = getState( 'auth', 'loginToken' );

    const withdrawIsEnabled = (

        !isLoading &&
        (
            (
                !!amount &&
                (Number( amount ) > 0)
            ) ||
            fullWithdraw
        ) &&
        !!address && // TODO: validate in production
        !!userId &&
        !!loginToken
    );

    return e(

        POWBlock,
        {

            onClick: async () => {

                await withdrawBitcoin({

                    amount,
                    address,
                    userId,
                    loginToken,
                    fullWithdraw
                });

                await actions.refreshUserData();
            },
            text: 'Withdraw Bitcoin',
            isLoadingMode: !withdrawIsEnabled,
            borderRadius: 0,
        }
    );
};
