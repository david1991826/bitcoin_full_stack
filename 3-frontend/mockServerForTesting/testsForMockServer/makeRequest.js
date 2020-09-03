'use strict';

require( 'dotenv' ).config({ path: '../.env' });

const axios = require( 'axios' );


(async () => {

	try {

		const axiosInstance = axios.create({

			baseURL: `http://localhost:${ process.env.PORT }`,
		});

		const apiCallResults = await axiosInstance.get( '/' );

		console.log(
			'results:',
			JSON.stringify( {

				status: apiCallResults.status,
				data: apiCallResults.data,

			}, null, 4 )
		);
	}
	catch( err ) {

		console.log(

			'an error occured:',
			JSON.stringify( {

				message: err.message,
				statusCode: err.response.status,

			}, null, 4 )
		);
	}
})();
