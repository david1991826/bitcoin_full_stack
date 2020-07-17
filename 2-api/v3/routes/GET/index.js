'use strict';

// const {
//     utils: {
//         redis: {
//             getClient
//         },
//         // stringify
//     },
// } = require( '@npm.m.stecky.efantis/commonprivate' );

const getHomeWebsite = require( './getHomeWebsite' );
const primaryActions = require( './primaryActions' );
    
let website = null;
let currentOmegaFormStatus = false;


exports.handler = async event => {
    

    const {

        apiIsInOmegaForm,

    } = await primaryActions({

        event,
    });

    if( !website || (currentOmegaFormStatus !== apiIsInOmegaForm)) {

        website = await getHomeWebsite({

            apiIsInOmegaForm
        });

        currentOmegaFormStatus = apiIsInOmegaForm;
    }

    return website;
};
