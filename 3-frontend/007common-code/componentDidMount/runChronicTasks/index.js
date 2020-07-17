import { delay } from '../../utils';
import ensureGoogleCaptchaIsInCorrectState from './ensureGoogleCaptchaIsInCorrectState';


const runFunctionForever = ({

    functionToRun,
    retryTime = 3000,

}) => new Promise( async ( /*resolve,  reject */ ) => {
        
    const runFunctionRecursion = async () => {
    
        try {
    
            await functionToRun();
        }
        catch( err ) {
    
            console.log( 'error in chronic task:', err );
        }
    
        await delay({ timeout: retryTime });
    
        runFunctionRecursion();
    };

    runFunctionRecursion();
});




const runChronicTasks = async () => {

    const chronicTasks = [

        runFunctionForever({

            retryTime: 10000,
            functionToRun: async () => {
    
                await ensureGoogleCaptchaIsInCorrectState();
            },
        })
    ];

    try {

        await Promise.all( chronicTasks );
    }
    catch( err ) {

        console.log( 'error in running chronic tasks:', err );
    }
};


export default runChronicTasks;
