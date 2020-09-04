'use strict';


module.exports = Object.freeze( ({

    verificationCode,

}) => {
    
    if(
        !verificationCode ||
        (typeof verificationCode !== 'string')
    ) {

        throw new Error(
            'getVerificationCodeComponents: invalid verification code'
        );
    }

    const splitVerificationCode = verificationCode.split( '_' );

    if( splitVerificationCode.length !== 3 ) {

        throw new Error(
            'getVerificationCodeComponents error: ' +
            `invalid verification code: ${ verificationCode }`
        );
    }
    
    const [ baseId, rawExpiryDate, extraId ] = splitVerificationCode;

    const expiryDate = Number( rawExpiryDate );

    if(
        !(
            (
                !!baseId &&
                (typeof baseId === 'string') &&
                (baseId.length > 5) &&
                (baseId.length <= 50)
            ) &&
            (
                !!expiryDate &&
                (typeof expiryDate === 'number')
            ) &&
            (
                !!extraId &&
                (typeof extraId === 'string') &&
                (extraId.length === 32)
            )
        )
    ) {

        throw new Error(
            'getVerificationCodeComponents error: ' +
            `invalid verification code: ${ verificationCode }`
        );
    }

    const verificationCodeComponents = {

        baseId,
        expiryDate,
        extraId
    };

    return verificationCodeComponents;
});