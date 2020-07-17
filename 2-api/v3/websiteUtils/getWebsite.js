'use strict';

const {
    utils: {
        stringify
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

const fs = require( 'fs' );


const getFormattedWebsite = Object.freeze( ({

    website,
    transformationKeyValuePairs

}) => {
    
    let formattedWebsite = website;

    const transformationKeys = Object.keys(

        transformationKeyValuePairs
    );

    for( const transformationKey of transformationKeys ) {

        const templateKey = `$$$_$$$${ transformationKey }$$$_$$$`;

        while( formattedWebsite.includes( templateKey ) ) {

            const transformationValue = transformationKeyValuePairs[

                transformationKey
            ];

            formattedWebsite = formattedWebsite.replace(
                
                templateKey,
                transformationValue
            );
        }
    }

    return formattedWebsite;
});


const getWebsite = Object.freeze( ({

    htmlFilePath,
    transformationKeyValuePairs,

}) => new Promise( ( resolve, reject ) => {
        
    fs.readFile( htmlFilePath, 'utf8', ( err, website ) => {

        if( !!err ) {

            return reject( err );
        }

        const formattedWebsite = getFormattedWebsite({

            website,
            transformationKeyValuePairs
        });

        resolve( formattedWebsite );
    });
}));


module.exports = Object.freeze( async ({

    htmlFilePath,
    transformationKeyValuePairs,

}) => {

    console.log(
        'running getWebsite with the following values:',
        stringify({
            htmlFilePath,
            transformationKeyValuePairs: Object.keys(
                transformationKeyValuePairs
            ),
        })
    );

    const website = await getWebsite({

        htmlFilePath,
        transformationKeyValuePairs
    });

    console.log(
        'getWebsite executed successfully, returning website:',
        website.substring( 0, 122 ) + '...'
    );

    return website;
});
