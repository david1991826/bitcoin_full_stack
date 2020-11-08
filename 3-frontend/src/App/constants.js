
export const isLivenetMode = (process.env.NODE_ENV === 'production');

export const fonts = {
    
    standard: {
     
        regular: 'ArialHebrew',
        bold: 'ArialHebrew-Bold',
    },
};

export const colours = {

    apiRoyalBlue: '#019BE5',
    black: '#000000',
    white: '#ffffff',

    lightTechBlue: '#01537B',
    
    bitcoin: {
        blue: '#61B3BE',
        orange: '#FE8834',
        grey: '#656776',
        darkGrey: '#1A2836',
    },
};

export const mainStyles = {

    dark: 'dark',
    light: 'light',
};

const mainStyleToMainStyleObject = {

    [mainStyles.dark]: {

        color: colours.white,
        backgroundColor: colours.black,
        alternateBackgroundColor: colours.lightTechBlue,
        alternateColor: colours.white,
    },
    [mainStyles.light]: {

        color: colours.black,
        backgroundColor: colours.white,
        alternateBackgroundColor: colours.lightTechBlue,
        alternateColor: colours.white,
    }
};

for( const mainStyle of Object.keys( mainStyleToMainStyleObject ) ) {

    const mainStyleObject = mainStyleToMainStyleObject[ mainStyle ];

    mainStyleObject.mainStyle = mainStyle;
}

export { mainStyleToMainStyleObject };

export const story = {

    metaModes: {

        zeroPointEnergy: 'zeroPointEnergy',
        privacyPolicy: 'privacyPolicy',
        termsOfService: 'termsOfService',
    },

    NotLoggedInMode: {

        mainModes: {

            initialChoiceMode: 'initialChoiceMode',
            signUpMode: 'signUpMode',
            afterSignUpMode: 'afterSignUpMode',
            loginMode: 'loginMode',
            verifyUserMode: 'verifyUserMode',
        }
    },
};


export const google = {

    grecapcha: {

        badgeClassName: 'grecaptcha-badge',
    }
};


export const queryStringModes = {

    account_verification: 'account_verification',
};


export const pathValues = {

    mode: 'mode',
    account_verification: 'account_verification',
    verification_code: 'verification_code',
    email: 'email',
};


export const apiUrl = process.env.REACT_APP_EXCHANGE_API_BASE_URL;

// if( isLivenetMode ) {
//     export const apiUrl = isLivenetMode ? (
//     ) : 
// }
