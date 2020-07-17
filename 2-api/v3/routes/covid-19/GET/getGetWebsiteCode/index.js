Object.freeze( ({

    rootPath,
    amountDonated

}) => async () => {
    'use strict';

    const {
        
        e,
        getGetComponent,
        getWebsiteCode

} = require( `${ rootPath }/../../../../reactWebsiteUtils` );


    const getComponent = getGetComponent({

        rootPath,
    });
    
    const [
        
        TitleText,
        SubtitleText,
        AddressSection,
        AmountDonatedSection,
        FacebookCommentSection
        
    ] = await Promise.all([
        
        getComponent({

            componentPath: 'TitleText'
        }),

        getComponent({

            componentPath: 'SubtitleText'
        }),

        getComponent({

            componentPath: 'AddressSection/index'
        }),

        getComponent({

            componentPath: 'AmountDonatedSection/index',
            values: {
                amountDonated,
            }
        }),

        getComponent({

            componentPath: 'FacebookCommentSection/index',
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
            e( SubtitleText ),
            e( AddressSection ),
            e( AmountDonatedSection ),
            e( FacebookCommentSection )
        ],
    });

    return websiteCode;
})