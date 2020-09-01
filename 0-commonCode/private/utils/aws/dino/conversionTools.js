'use strict';

const { AWS } = require( '../aws' );

const getDinoClientDino = Object.freeze(
    ({ dynamoDino }) => AWS.DynamoDB.Converter.unmarshall( dynamoDino )
);


module.exports = Object.freeze({
    getDinoClientDino    
});
