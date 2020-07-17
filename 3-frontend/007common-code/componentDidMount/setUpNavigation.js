import { actions } from '../utils';


export default () => {

    window.history.pushState(
        {
            key: 'exchange'
        },
        'exchange'
    );

    window.onpopstate = () => {
        
        const isOnRestPage = actions.getIsOnRestPage();

        if( !isOnRestPage ) {

            window.location = '/';
        }
        else {
            
            window.history.back();
        }
    };
};
