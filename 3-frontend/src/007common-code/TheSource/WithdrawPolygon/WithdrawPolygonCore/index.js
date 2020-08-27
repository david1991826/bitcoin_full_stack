import { createElement as e } from 'react';
import AmountSection from './AmountSection';
import AddressInput from './AddressInput';
import WithdrawButton from './WithdrawButton';


export default () => {

    return [
        e( AmountSection, { key: 'a' } ),
        e( AddressInput, { key: 'b' } ),
        e( WithdrawButton, { key: 'c' } )
    ];
};
