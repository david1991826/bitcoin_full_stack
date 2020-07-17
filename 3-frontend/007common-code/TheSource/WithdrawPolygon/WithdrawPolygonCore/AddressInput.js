import { createElement as e } from 'react';
import { getState, setState } from '../../../reduxX';
import { WatermelonInput } from '../../usefulComponents';


export default () => {

    const address = getState( 'withdrawPolygon', 'address' );
    const isLoading = getState( 'isLoading' );
    
    return e(
        WatermelonInput,
        {
            value: address,
            borderRadius: 0,
            title: 'Address to Send BTC to',
            // marginTop: 0,
            // marginBottom: 0,
            isLoadingMode: isLoading,
            onChange: event => {

                const text = event.target.value;

                if( text.length > 50 ) {

                    return;
                }
            
                setState( [ 'withdrawPolygon', 'address' ], text.trim() );
            },
        }
    );

};
