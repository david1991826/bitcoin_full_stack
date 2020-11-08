'use strict';


module.exports = Object.freeze( value => {

    const regex = new RegExp( '^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$' );

    const isValidAddress = !!value && !!value.match( regex );

    return isValidAddress;
});