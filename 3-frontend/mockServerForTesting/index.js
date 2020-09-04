'use strict';

require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const port = process.env.PORT;

app.use( cors() );
app.use( express.json() );

const stringify = message => JSON.stringify( message, null, 4 );


app.get( '/', ( req, res, next ) => {

	// const error = new Error( 'testError' );
	// error.statusCode = 420;
	// next( error );
	
	res.send({ test: '123' });
});


app.post( '/login', ( req, res, next ) => {

	console.log(

		'request to /login - POST with the following value:',
		stringify({

			body: req.body,
		})
	);

	res.send({


        loginToken: 'fake-exchange-user-login-token',
        userId: 'exchange_user_fake_user_id_123'
	});
});

app.post( '/logout', ( req, res, next ) => {

	console.log(

		'request to /logout - POST with the following value:',
		stringify({

			body: req.body,
		})
	);

	res.send({});
});

app.post( '/exchange-users', ( req, res, next ) => {

	console.log(

		'request to /exchange-users - POST with the following value:',
		stringify({

			body: req.body,
		})
	);

	res.send({});
});


app.get( '/exchange-users/:exchangeUserId', ( req, res, next ) => {

	console.log(

		'request to /exchange-users/:exchange-user-id - GET with the following value:',
		stringify({

			param: req.params,
			headerUserId: req.headers[ 'user-id' ],
			headerLoginToken: req.headers[ 'login-token' ],
		})
	);

	res.send({

        userId: 'exchange_user_fake_user_id_123',
        email: 'john@smith.com',
        balanceData: {

    		bitcoin: {

    			totalAmount: 6.9,
    			depositAddress: null,
    		},

    		bitcoinWithdraws: {

                totalAmount: 2,
                currentState: 'test state',
            },

            crypto: {
                totalAmount: 0,
            },

            exchange: {
                bitcoin: {
                    totalAmount: 42.0,
                },
                crypto: {
                    totalAmount: 420,
                },
            },

            summary: {

    	       	bitcoin: {
		            totalAmount: 5
		        },
		        crypto: {
		            totalAmount: 3
		        },
            }
    	},
	});
});

app.post( '/verify-user', ( req, res, next ) => {

	console.log(

		'request to /verify-user - POST with the following value:',
		stringify({

			body: req.body,
		})
	);

	res.send({


        loginToken: 'fake-exchange-user-login-token',
        userId: 'exchange_user_fake_user_id_123'
	});
});


app.listen( port, err => {

 	console.log( `Example app listening at http://localhost:${port}` );
});
