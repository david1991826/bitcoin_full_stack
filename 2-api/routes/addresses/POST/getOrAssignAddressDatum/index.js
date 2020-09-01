'use strict';

const {
    utils: {
        stringify
    }
} = require( '@bitcoin-api.io/common-private' );

const getAddressDatum = require( './getAddressDatum' );


module.exports = Object.freeze( async ({

    user

}) => {
    
    console.log( 'running getOrAssignAddressDatum' );
    
    const addressDatum = await getAddressDatum({

        user
    });

    const results = (
    
        !!addressDatum &&
        !!addressDatum.address
    
    ) ? {

        address: addressDatum.address,
        // timeOfExpiry: (
        // timeOfExpiry: (

        //     addressDatum.conversionDate +
        //     addressDatum.timeUntilReclamationAfterConversionDate
        // )

    } : {

        address: null,
        // timeOfExpiry: null
    };

    console.log(
        
        'getOrAssignAddressDatum executed successfully ' +
        `returning results: ${ stringify( results ) }`
    );

    return results;
});
