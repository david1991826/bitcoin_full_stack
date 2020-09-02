import { createElement as e, useState, useEffect } from 'react';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { setUpReduxX, getState } from './reduxX';
import { story } from './constants';
import TheActualApp from './TheActualApp';
import componentDidMount from './componentDidMount';
import { zanzibarRealms } from './TheSource';
Amplify.configure( aws_exports );


const getStyles = () => {
    
    const mainStyleObject = getState( 'mainStyleObject' );

    return {

        outerContainer: {
            backgroundColor: mainStyleObject.backgroundColor,
            // backgroundColor: 'orange',
            // width: '100%',
            // height: '100%',
            width: '100%',
            // height: 500,

            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
        },

        // spiritual: {

        //     width: 300,
        //     height: 600,
        //     backgroundColor: 'beige',  
        // }
    };
};


export default ({

    websiteName = 'AtExchange.io',
    websiteAbbreviation = 'AE',
    supportEmail = 'support@atexchange.io',
    safeMode = false,
    
}) => {

    useEffect( () => {

        componentDidMount();

    }, [] );

    setUpReduxX( useState );

    const styles = getStyles();

    const metaMode = getState( 'metaMode' );

    const createElementArguments = [
        'div',
        {
            style: styles.outerContainer,
        },
    ];

    if( metaMode === story.metaModes.privacyPolicy ) {

        createElementArguments.push(
            e(
                zanzibarRealms.PrivacyPolicyRealm,
                {
                    websiteName,
                    websiteAbbreviation,
                    supportEmail
                }
            )
        );
    }
    else if( metaMode === story.metaModes.termsOfService ) {

        createElementArguments.push(
            e(
                zanzibarRealms.TermsOfServiceRealm,
                {
                    websiteName,
                    websiteAbbreviation,
                    supportEmail
                }
            )
        );
    }
    else {

        createElementArguments.push(
            e(
                TheActualApp,
                {
                    websiteName,
                    safeMode
                }
            )
        );
    }

    return e( ...createElementArguments );
};
