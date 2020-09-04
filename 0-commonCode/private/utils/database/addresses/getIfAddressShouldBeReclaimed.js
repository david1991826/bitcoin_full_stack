'use strict';


module.exports = Object.freeze( ({

    addressDatum

}) => {

    console.log(
        'running getIfAddressShouldBeReclaimed ' +
        `for address ${ addressDatum.address }`
    );

    if( addressDatum.amount > 0 ) {

        console.log(
            
            'getIfAddressShouldBeReclaimed - address is used. ' +
            'the address should not be reclaimed'
        );

        return false;
    }

    const expiryDate = (
        addressDatum.conversionDate +
        addressDatum.timeUntilReclamationAfterConversionDate
    );

    const addressHasExpired = Date.now() > expiryDate;

    if( addressHasExpired ) {

        console.log(
            
            'getIfAddressShouldBeReclaimed - address is unused ' +
            'and is expired, it should be reclaimed'
        );

        return true;
    }

    console.log(
            
        'getIfAddressShouldBeReclaimed - address is unused ' +
        'and has not expired yet, it should not be reclaimed'
    );

    return false;
});
