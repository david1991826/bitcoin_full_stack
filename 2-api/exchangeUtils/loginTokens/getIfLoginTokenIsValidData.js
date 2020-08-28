'use strict';

const {
    utils: {
        stringify
    },
} = require( '@bitcoin-api.io/common-private' );

const getHashedPassword = require( '../javascript/getHashedPassword' );
const getLoginTokens = require( './getLoginTokens' );

const {
    loginTokens: {
        numberOfAllowedSignedInLoginTokens
    }
} = require( '../constants' );

let xoOvoDecrypt;


const maximumNumberOfValidTokens = numberOfAllowedSignedInLoginTokens;

const getIfLoginTokenIsValidGivenTokenData = Object.freeze( ({

    loginTokenId,
    loginTokens

}) => {
    
    if( !xoOvoDecrypt ) {

        xoOvoDecrypt = require(
            '../../sacredElementals/crypto/xoOvoDecrypt'
        );
    }

    const hashedLoginTokenIdFromRequestHeader = getHashedPassword({

        password: loginTokenId
    });

    let tokenCount = 0;

    for( const loginTokenDatum of loginTokens ) {

        const hashedLoginTokenIdFromDatabase = xoOvoDecrypt({

            text: loginTokenDatum.loginTokenId
        });

        const loginTokenIsValid = (

            !loginTokenDatum.signedOut &&
            (
                hashedLoginTokenIdFromDatabase ===
                hashedLoginTokenIdFromRequestHeader
            )
        );

        if( loginTokenIsValid ) {

            return {
                
                hashedLoginTokenIdFromRequestHeader,
                loginTokenIsValid: true,
            };
        }
        // else if( !loginTokenDatum.signedOut ) {

            tokenCount++;

            if( tokenCount > maximumNumberOfValidTokens ) {

                return {
                
                    hashedLoginTokenIdFromRequestHeader: null,
                    loginTokenIsValid: false,
                };
            }
        // }
    }

    return {
                
        hashedLoginTokenIdFromRequestHeader: null,
        loginTokenIsValid: false,
    };
});


const getIfLoginTokenIsValidDataCore = Object.freeze( async ({

    loginTokenId,
    exchangeUserId,
    shouldGetFullLoginTokenInfo,
    shouldOnlyGetInitialTokens
    
}) => {

    // TODO: consider expiry
    const loginTokens = await getLoginTokens({

        exchangeUserId,
        shouldGetFullLoginTokenInfo,
        shouldOnlyGetInitialTokens
    });

    const {

        loginTokenIsValid,
        hashedLoginTokenIdFromRequestHeader,

    } = getIfLoginTokenIsValidGivenTokenData({

        loginTokens,
        loginTokenId
    });

    return {
        
        loginTokenIsValid,
        loginTokens,
        hashedLoginTokenIdFromRequestHeader,
    };
});


module.exports = Object.freeze( async ({

    loginTokenId,
    exchangeUserId,
    shouldGetFullLoginTokenInfo,
    shouldOnlyGetInitialTokens,
    
}) => {

    console.log(
        `running getIfLoginTokenIsValidData
            with the following values - ${
                stringify({
                    loginTokenId,
                    exchangeUserId,
                    shouldGetFullLoginTokenInfo,
                    shouldOnlyGetInitialTokens,
                })
        }`
    );

    try {

        const {
            
            loginTokenIsValid,
            loginTokens,
            hashedLoginTokenIdFromRequestHeader,
            
        } = await getIfLoginTokenIsValidDataCore({

            loginTokenId,
            exchangeUserId,
            shouldGetFullLoginTokenInfo,
            shouldOnlyGetInitialTokens,
        });

        console.log(
        
            'getIfLoginTokenIsValidData executed successfully - ' +
            `the provided loginToken ${ loginTokenIsValid ? (
                'is valid'
            ) : 'is invalid' }`
        );

        return {
            
            loginTokenIsValid,
            exchangeUserId,
            loginTokens,
            hashedLoginTokenIdFromRequestHeader
        };
    }
    catch( err ) {

        console.log(
        
            'getIfLoginTokenIsValidData',
            'caught-error-to-not-throw-and-to-ignore -',
            err,
            'the provided loginToken is invalid'
        );

        return {
            
            loginTokenIsValid: false,
            exchangeUserId: null,
            loginTokens: [],
            hashedLoginTokenIdFromRequestHeader: null
        };
    }
});
