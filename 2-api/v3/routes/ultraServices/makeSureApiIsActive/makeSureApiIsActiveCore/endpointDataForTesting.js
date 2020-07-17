'use strict';


module.exports = Object.freeze([

    {
        method: 'GET',
        resource: '',
        getIfResponseIsValid: response => {

            if( !response.includes( 'property="og:url"' ) ) {

                return false;
            }

            return true;
        },
        headers: {
            
            [process.env.WEBSITE_DO_NOT_GATHER_DATA_KEY]: (

                process.env.WEBSITE_DO_NOT_GATHER_DATA_SECRET
            )
        },
    },

    {
        method: 'GET',
        resource: 'token-activator',
        getIfResponseIsValid: response => {

            if( !response.includes( 'Activate Token' ) ) {

                return false;
            }

            return true;
        }
    },

    {
        method: 'GET',
        resource: 'terms-of-service',
        getIfResponseIsValid: response => {

            if( !response.includes( 'TERMS OF SERVICE' ) ) {

                return false;
            }

            return true;
        }
    },

    {
        method: 'GET',
        resource: 'privacy-policy',
        getIfResponseIsValid: response => {

            if( !response.includes( 'the Privacy Policy' ) ) {

                return false;
            }

            return true;
        }
    },

    {
        method: 'GET',
        resource: 'documentation/api',
        getIfResponseIsValid: response => {

            if( !response.includes( 'learn more' ) ) {

                return false;
            }

            return true;
        }
    },
]);
