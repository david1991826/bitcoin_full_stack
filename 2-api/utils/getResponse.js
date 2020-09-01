'use strict';


module.exports = Object.freeze(({

    statusCode = 200,
    body,

}) => {

    return {

        statusCode,
        body: JSON.stringify( body ),
    };
});