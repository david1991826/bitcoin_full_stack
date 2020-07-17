Object.freeze( ({

    rootPath,

}) => async () => {
    'use strict';

    const {
        
        e,
        getGetComponent,
        getWebsiteCode

    } = require( `${ rootPath }/../../../../../reactWebsiteUtils` );

    const getComponent = getGetComponent({

        rootPath,
    });
    
    const [
        
        TitleText,
        BodyText,
        
    ] = await Promise.all([
        
        getComponent({

            componentPath: 'TitleText'
        }),

        getComponent({

            componentPath: 'BodyText'
        }),
    ]);
    
    const websiteCode = getWebsiteCode({

        mostParentElementStyle: {

            // backgroundColor: 'pink',
            maxWidth: 600,
            width: '95%',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            alignSelf: 'center',
        },
        childrenElements: [
            e( TitleText ),
            e( BodyText )
        ],
    });

    return websiteCode;
})