'use strict';

const AWS = require( 'aws-sdk' );


module.exports = Object.freeze({

    sesv2: new AWS.SESV2(),
});
