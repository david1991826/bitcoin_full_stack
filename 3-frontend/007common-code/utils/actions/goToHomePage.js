import { setState } from '../../reduxX';


export default () => {

    setState(
        {
            keys: 'metaMode',
            value: null
        },
        {
            keys: [ 'notLoggedInMode', 'mainMode' ],
            value: null
        }
    );
};