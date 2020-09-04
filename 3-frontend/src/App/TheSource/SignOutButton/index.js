import { createElement as e } from 'react';
import { getState } from '../../reduxX';
import { actions } from '../../utils';
import { usefulComponents } from '../../TheSource';


export default () => {

    const isLoading = getState( 'isLoading' );

    return e(

        usefulComponents.POWBlock,
        {
            marginBottom: 40,
            onClick: () => {

                actions.signOut();
            },
            text: 'Logout',
            isLoadingMode: isLoading,
            marginTop: 100,
        }
    );
};
