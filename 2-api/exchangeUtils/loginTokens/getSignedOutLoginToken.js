'use strict';


module.exports = Object.freeze( ({

    loginToken,
    ipAddress,
    otherKeyValues = {}

}) => {

    const signedOutLoginToken = Object.assign(

        {},
        loginToken,
        otherKeyValues,
        {
            signedOut: true,
            signedOutIpAddress: ipAddress,
            signedOutTime: Date.now(),
        }
    );

    return signedOutLoginToken;
});
