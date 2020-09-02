import ReduxX, { v } from 'react-state-management';
import {
    mainStyles,
    mainStyleToMainStyleObject,
    // story
} from './constants';

const initialMainStyleObject = mainStyleToMainStyleObject[ mainStyles.dark ];
 
 
export const {
 
    setUpReduxX,
    setState,
    getState,
 
    /* Optional Exports: */
    resetReduxX,
    // getGlobalUseState,
    // oldeFashionedStateManagement
 
} = ReduxX({
 
    initialState: {

        mainStyleObject: v( initialMainStyleObject ),

        // metaMode: v( story.metaModes.zeroPointEnergy ),
        metaMode: v( null ),
        // metaMode: v( 'termsOfService' ),

        // isLoading: v( false ),
        // isLoading: v( false ),
        isLoading: v( false ),

        auth: {

            userId: v( null ),
            loginToken: v( null ),
            // userId: v( 'exchange_user_8027206ba0724b97a17a8e1870b907b8' ),
            // loginToken: v( 'login_token-13fa669da4c0494892d86021f781ed31cdc7d739d975437cac430ee12f6310959e6b8681c62848408413fe72e96229e6' ),
        },

        signUpPolygon: {

            emailInput: v( '' ),
            passwordInput: v( '' ),
            reTypePasswordInput: v( '' ),
            agreeToTermsOfService: v( false ),
            // agreeToTermsOfService: v( true ),
            agreeToPrivacyPolicy: v( false ),
            // agreeToPrivacyPolicy: v( true ),
        },

        verifyEmailPolygon: {

            emailInput: v( '' ),
            passwordInput: v( '' ),
            verifyEmailCodeInput: v( '' ),
        },

        loginPolygon: {

            emailInput: v( '' ),
            passwordInput: v( '' ),
        },

        getUserPolygon: {

            userIdInput: v( '' ),
            loginTokenInput: v( '' ),
        },

        withdrawPolygon: {

            amount: v( '0' ),
            address: v( '' ),
            fullWithdraw: v( false ),
        },

        exchangePolygon: {

            amountWantedInCryptos: v( '' ),
            amountWantedInBitcoin: v( '' ),
        },

        notLoggedInMode: {

            // mainMode: v( null ),
            mainMode: v( 'signUpMode' ),
            // mainMode: v( 'loginMode' ),
            // mainMode: v( 'verifyUserMode' ),
        },

        loggedInMode: {

            userData: v( null ),
            // userData: v({
            //     "userId": "exchange_user_8027206ba0724b97a17a8e1870b907b8",
            //     "email": "mikeysteckyefantis@gmail.com",
            //     "balanceData": {
            //         "bitcoin": {
            //             "totalAmount": 0.0002,
            //             "depositAddress": "2NFMjiMwon6FuiE2vjeGSmw17tbz7iBN6Bq"
            //         },
            //         "bitcoinWithdraws": {
            //             "totalAmount": 0.0002,
            //             "currentState": "no_withdraws_are_currently_being_processed"
            //         },
            //         "exchange": {
            //             "bitcoin": {
            //                 "totalAmount": 0
            //             }
            //         },
            //         "summary": {
            //             "bitcoin": {
            //                 "totalAmount": 0
            //             }
            //         }
            //     }
            // }),
        },

        ultraTools: {

            fastMessageData: v( null ),
            // fastMessageData: v({

            //     message: 'this is the mega test message for monkeys and for people but for monkeys.🙊',
            //     timeout: 20000,
            // }),
        },

        coinExperiencePolygon: {

            amount: v( 0 ),
        },
    }
});