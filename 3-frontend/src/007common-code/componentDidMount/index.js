import { grecaptcha } from '../utils';
import setUpNavigation from './setUpNavigation';
// import processQueryString from './processQueryString';
import processPath from './processPath';
import runChronicTasks from './runChronicTasks';
import loadGrecaptcha from './loadGrecaptcha';



export default () => {

    setUpNavigation();

    loadGrecaptcha();

    grecaptcha.hideGrecaptcha();

    processPath();

    runChronicTasks();
};
