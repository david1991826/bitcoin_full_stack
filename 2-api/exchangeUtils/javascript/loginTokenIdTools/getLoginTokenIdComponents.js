'use strict';


module.exports = Object.freeze( ({

    loginTokenId

}) => {

    if(
        !loginTokenId ||
        (typeof loginTokenId !== 'string')
    ) {

        throw new Error(
            'getLoginTokenIdComponents: ' +
            `invalid loginTokenId: ${ loginTokenId }`
        );
    }
    
    const splitLoginTokenId = loginTokenId.split( '-' );

    if( splitLoginTokenId.length !== 2 ) {

        throw new Error(
            'getLoginTokenIdComponents: ' +
            `invalid loginTokenId: ${ loginTokenId }`
        );
    }

    const [ loginTokenTag, baseId ] = splitLoginTokenId;

    if(
        !(
            (
                loginTokenTag ===
                'login_token'
            ) &&
            (
                !!baseId &&
                (baseId.length === 96)
            )
        )
    ) {

        throw new Error(
            'getLoginTokenIdComponents: ' +
            `invalid loginTokenId: ${ loginTokenId }`
        );
    }

    return {

        baseId
    };
});