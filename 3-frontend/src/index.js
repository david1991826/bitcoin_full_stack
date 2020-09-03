import { createElement as e } from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import App from './App';


// ReactDOM.render( e('div'), document.getElementById('root'));
ReactDOM.render(
    
    e(
        App,
        {
            safeMode: true,
        }
    ),
    document.getElementById( 'root' )
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
