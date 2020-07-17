import axios from 'axios';
import { apiUrl } from '../../constants';

const httpMethodToAxiosMethod = Object.freeze({

    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
});


export default Object.freeze( async ({

    resource,
    body,
    method,
    headers = {},

}) => {
    
    const url = `${ apiUrl }/${ resource }`;

    const axiosArgs = [ url ];

    if( !!body ) {

        axiosArgs.push( body );
    }

    const axiosOptions = {};

    axiosOptions.headers = Object.assign(
        
        {},
        {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        },
        headers
    );

    const instance = axios.create( axiosOptions );

    const axiosMethod = httpMethodToAxiosMethod[ method ];

    try {
        
        const response = await instance[ axiosMethod ]( ...axiosArgs );

        return response.data;
    }
    catch( err ) {
    
        const errorMessage = (
            
            !!err &&
            !!err.response &&
            !!err.response.data &&
            !!err.response.data.message &&
            err.response.data.message

        ) || 'internal server error';

        console.log( 'The error:', errorMessage );

        throw err;
    }
});
