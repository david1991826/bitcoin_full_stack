'use strict';

const React = require( 'react' );
// const ReactDOMServer = require( 'react-dom/server' );
const fs = require( 'fs' );


const getComponentFactory = Object.freeze( ({

    rawComponentFactoryData,

}) => {

    try {
        
        const componentFactory = eval(
            `(${ rawComponentFactoryData.toString() })`
        );
        
        return componentFactory;
    }
    catch( err ) {

        console.log(
            'an error occurred in getGetComponent.getComponentFactory',
            err
        );

        return null;
    }
});


module.exports = Object.freeze( /* get get component*/ ({

    rootPath,

}) => Object.freeze( /*get component*/ ({

    componentPath,
    values

}) => Object.freeze( /*the component*/ new Promise( ( resolve, reject ) => {

    const fullComponentPath = `${ rootPath }/${ componentPath }.js`

    fs.readFile( fullComponentPath, async ( err, rawComponentFactoryData ) => {

        if( !!err ) {

            return reject( err );
        }
        
        const componentFactory = getComponentFactory({

            rawComponentFactoryData,
        });

        if( !componentFactory ) {

            const err = new Error(
                `error parsing component: ${ componentPath }`
            );

            return reject( err );
        }
        
        const componentOrComponentPromise = componentFactory({

            e: React.createElement,
            values,
        });

        resolve( componentOrComponentPromise );
    });
}))));