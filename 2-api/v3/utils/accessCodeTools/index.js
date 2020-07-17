'use strict';

const getTemplarCode = require( './getTemplarCode' );
const getETCData = require( './getETCData' );

const { users: { USER_ID_LENGTH } } = require( '../constants' );


const getReturnCode = Object.freeze( ({

    userId,
    megaCode

}) => {

    console.log( 'running getReturnCode' );

    const returnCode = `${ megaCode }${ userId }`;

    console.log( 'getReturnCode executed successfully, returning returnCode' );

    return returnCode;
});


const getDecodedReturnCode = Object.freeze( ({

    returnCode,

}) => {

    console.log( 'running getDecodedReturnCode' );

    const userIdIndex = (returnCode.length - USER_ID_LENGTH);

    const userId = returnCode.substring( userIdIndex );
    const megaCode = returnCode.substring( 0, userIdIndex );

    console.log(
        
        'getDecodedReturnCode executed successfully, ' +
        'returning decodedReturnCode'
    );

    return {

        userId,
        megaCode
    };
});


module.exports = Object.freeze({

    getReturnCode,
    getDecodedReturnCode,
    getTemplarCode,
    getETCData,
});