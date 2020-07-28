'use strict';

const yargs = require( 'yargs' );

const isProductionMode = (yargs.argv.mode === 'production');


if( isProductionMode ) {

    console.log( '☢︎🐑 is production mode' );

    require( 'dotenv' ).config({

        path: `${ __dirname }/credentials/beautifulRiver3/production/.env`
    });

    process.env.BITCOIN_API_ENV = 'production';
}
else {

    console.log( '🐲🐉 is staging mode' );

    require( 'dotenv' ).config({

        path: `${ __dirname }/credentials/beautifulRiver3/staging/.env`
    });

    process.env.BITCOIN_API_ENV = 'staging';
}


const environmentVariables = Object.assign( {}, process.env );

const {

    // AWS
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_ACCOUNT_NUMBER,

    // Redis
    REDIS_URL,

    // Common
    NODE_ENV,
    DO_NOT_SHOW_REAL_ERRORS,
    MEGA_CODE_ENCRYPTION_PASSWORD_4,
    MEGA_CODE_ENCRYPTION_ID_4,
    
    LOGGER_COLOUR_OFF,
    ROOT_LOGGER_PATH,
    LOG_LEVELS,
    LOG_LEVELS_ON_FOR_COMPONENTS,
    IS_LAMBDA,
    AWS_NODEJS_CONNECTION_REUSE_ENABLED,
    BITCOIN_API_ENV,
    SHOULD_CONSIDER_BANK_STATUS_IN_STAGING_MODE,
    // GOOGLE_CAPTCHA_KEY,
    // GOOGLE_CAPTCHA_SECRET,

    BITCOIN_API_BASE_URL,
    // BITCOIN_API_PRIVACY_POLICY_URL,
    // BITCOIN_API_TERMS_OF_SERVICE_URL,
    // BITCOIN_API_API_DOCUMENTATION_URL,
    // BITCOIN_API_TOKEN_FOR_MONITORING_TESTS,
    MAINTENANCE_MODE_CODE,
    MAINTENANCE_MODE_MESSAGE,
    // PATCH_TOKENS_BYPASS_IS_HUMAN_TEST_SECRET,
    // WEBSITE_DO_NOT_GATHER_DATA_KEY,
    // WEBSITE_DO_NOT_GATHER_DATA_SECRET,

    // CORONA_VIRUS_BITCOIN_API_IO_TOKEN,
    // CORONA_VIRUS_DONATION_ADDRESS_QR_CODE_URL,
    // CORONA_VIRUS_DONATION_ADDRESS,

} = environmentVariables;

const getFunctionDataFunctions = require( './007getFunctionDataFunctions' );


const rawFunctionData = [];

Object.keys(
    
    getFunctionDataFunctions

).forEach( getFunctionDataFunctionKey => {

    const getFunctionDataFunction = getFunctionDataFunctions[

        getFunctionDataFunctionKey
    ];

    const rawFunctionDataPortion = getFunctionDataFunction({

        isProductionMode,
        environmentVariables
    });

    rawFunctionData.push( ...rawFunctionDataPortion );
});


const functionData = [];

for( const rawFunctionDatum of rawFunctionData ) {

    if( process.env.BITCOIN_API_ENV !== 'production' ) {

        const functionDatum = Object.assign(

            {},
            rawFunctionDatum,
            {
                name: `bitcoin_api_${ rawFunctionDatum.name }_staging`,
                role: (
                    'arn:aws:iam::' +
                    `${ AWS_ACCOUNT_NUMBER }:role/` +
                    `bitcoin_api_lambda_${ rawFunctionDatum.name }_staging`
                ),
            }
        );

        functionData.push( functionDatum );
    }
    else {

        const functionDatum = Object.assign(

            {},
            rawFunctionDatum,
            {
                name: `bitcoin_api_${ rawFunctionDatum.name }`,
                role: (
                    'arn:aws:iam::' +
                    `${ AWS_ACCOUNT_NUMBER }:role/` +
                    `bitcoin_api_lambda_${ rawFunctionDatum.name }`
                ),
            }
        );

        functionData.push( functionDatum );
    }
}

const commonPathsToInclude = [

    './utils',
    './package.json',
    './node_modules',
];


const commonEnvironmentVariables = {

    DO_NOT_SHOW_REAL_ERRORS,
    LOGGER_COLOUR_OFF,
    IS_LAMBDA,
    NODE_ENV,
    LOG_LEVELS,
    LOG_LEVELS_ON_FOR_COMPONENTS,
    ROOT_LOGGER_PATH,
    REDIS_URL,
    AWS_NODEJS_CONNECTION_REUSE_ENABLED,
    BITCOIN_API_ENV,
    BITCOIN_API_BASE_URL,
    SHOULD_CONSIDER_BANK_STATUS_IN_STAGING_MODE,
    MAINTENANCE_MODE_CODE,
    MAINTENANCE_MODE_MESSAGE,
    
    MEGA_CODE_ENCRYPTION_PASSWORD_4,
    MEGA_CODE_ENCRYPTION_ID_4,
};

const execa = require( 'execa' );
const bluebird = require( 'bluebird' );
const AWS = require( 'aws-sdk' );
const fs = require( 'fs' );

AWS.config.update({

    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});


const cache = Object.seal({

    emptyFunctionCode: null
});


const lambda = new AWS.Lambda();

const ROOT_PATH = `${ __dirname }/`;

/*
    Deploy Lambda Script:
        remove node modules
        install production node modules
        for each lambda function data
            -zip folders
            -update code
*/


const removeNodeModulesAndOldDist = () => {

    console.log( 'running removeNodeModulesAndOldDist' );

    const command = 'rm';

    const args = [

        '-rf',
        './node_modules',
        './dist'
    ];

    const options = {

        cwd: ROOT_PATH
    };

    return execa( command, args, options ).then( () => {

        console.log( 'removeNodeModulesAndOldDist executed successfully' );

        return execa( 'mkdir', [ 'dist' ], options );

    });
};


const installNodeModules = ({

    production = false

} = { production: false }) => {

    console.log( 'running installNodeModules, production:', production );

    const command = 'npm';

    const args = [

        'install'
    ];

    if( !!production ) {

        args.push( '--production' );
    }

    const options = {

        cwd: ROOT_PATH
    };

    return execa(

        command,
        args,
        options

    ).then( () => {

        console.log(

            'installNodeModules executed successfully',
            'production:', production
        );
    });
};


const getOrCreateFunction = async ({

    functionNickname,
    functionName

}) => {

    console.log( `running getOrCreateFunction for: ${ functionNickname }` );

    const params = {

        FunctionName: functionName, 
    };

    try {

        await new Promise( ( resolve, reject ) => {
        
            lambda.getFunction(
                
                params,
    
                ( err, data ) => {
                    
                    if( !!err || !data ) {
                        
                        reject( err );
                    }
                    else {
    
                        resolve();
                    }
                }
            );    
        });
        
        console.log(
        
            'getOrCreateFunction: ' +
            `${ functionName }(${ functionNickname }) ` +
            'already exists'
        );
    }
    catch( err ) {

        if( err.statusCode === 404 ) {

            console.log(
                `getOrCreateFunction: ${ functionName } does not exist, ` +
                'creating function'
            );

            if( !cache.emptyFunctionCode ) {

                cache.emptyFunctionCode = await new Promise(
                    
                    ( resolve, reject ) => {

                        fs.readFile(

                            `${ __dirname }/emptyLambda.js.zip`,    
                            ( err, zipFile ) => {
                
                                if( !!err ) {
                
                                    return reject( err );
                                }
                
                                resolve( zipFile );
                            }
                        );
                    }
                );
            }

            await new Promise( ( resolve, reject ) => {

                lambda.createFunction(
                    
                    {
                        Code: {
                            
                            ZipFile: cache.emptyFunctionCode
                        }, 
                        FunctionName: functionName, 
                        Handler: "index.handler",
                        MemorySize: 128, 
                        Publish: true, 
                        Role: `arn:aws:iam::${ AWS_ACCOUNT_NUMBER }:role/bitcoin_api_lambda_emptyLambda`,
                        Runtime: "nodejs12.x", 
                        Timeout: 30, 
                        VpcConfig: {}
                    },
        
                    ( err, data ) => {
                        
                        if( !!err || !data ) {

                            reject( err );
                        }
                        else {
        
                            resolve();
                        }
                    }
                );    
            });
        }
        else {

            throw err;
        }
    }

    console.log(
        `getOrCreateFunction: executed successfully for ${ functionName }` +
        `(${ functionNickname })`
    );
};


const zipFunctionCode = ({

    zipFileName,
    functionSpecificPathsToInclude,

}) => {

    console.log( 'running zipFunctionCode' );

    const zipFilePath = `./dist/${ zipFileName }.zip`;

    const command = 'zip';

    const pathsToIncludeSet = new Set(

        functionSpecificPathsToInclude.concat( commonPathsToInclude )
    );

    const pathsToInclude = Array.from( pathsToIncludeSet );

    console.log( 'zipFileName:', zipFileName );
    console.log( 'paths to include:', JSON.stringify( pathsToInclude ) );

    const args = [ zipFilePath, '-r' ].concat( pathsToInclude );

    const options = {

        cwd: ROOT_PATH
    };

    return execa(

        command,
        args,
        options

    ).then( () => {

        return new Promise( ( resolve, reject ) => {

            fs.readFile( zipFilePath, ( err, zipFile ) => {

                if( !!err ) {

                    return reject( err );
                }

                resolve( zipFile );
            });
        });

    }).then( zipFile => {

        console.log(

            'zipFunctionCode executed successfully for', zipFileName
        );

        const results = {

            zipFile
        };

        return results;
    });
};


const uploadFunction = ({

    nickname,
    name,
    zipFile

}) => {

    console.log( `running uploadFunction for: ${ nickname }` );

    const params = {

        FunctionName: name,
        ZipFile: zipFile
    };

    return new Promise( ( resolve, reject ) => {

        lambda.updateFunctionCode( params, ( err/*, data*/ ) => {

            if( !!err ) {

                return reject( err );
            }

            console.log(

                'uploadFunction executed successfully for', nickname
            );

            resolve();
        });
    });
};


const updateFunctionConfiguration = ({

    nickname,
    name,
    handler,
    role,
    environmentVariables = {},
    timeout = 30,
    memory = 128

}) => {

    console.log( `running updateFunctionConfiguration for: ${ nickname }` );

    const params = {

        FunctionName: name,
        Handler: handler,
        Role: role,
        Environment: {

            Variables: Object.assign(

                {},
                commonEnvironmentVariables,
                environmentVariables
            )
        },
        Runtime: 'nodejs12.x',
        Timeout: timeout,
        MemorySize: memory,
    };

    return new Promise( ( resolve, reject ) => {

        lambda.updateFunctionConfiguration( params, ( err/*, data*/ ) => {

            if( !!err ) {

                return reject( err );
            }

            console.log(

                'updateFunctionConfiguration executed successfully for',
                nickname
            );

            resolve();
        });
    });
};


const deployFunction = async ({

    nickname,
    name,
    handler,
    role,
    pathsToInclude,
    environmentVariables,
    timeout,
    memory

}) => {

    await getOrCreateFunction({

        functionNickname: nickname,
        functionName: name
    });

    const { zipFile } = await zipFunctionCode({

        zipFileName: name,
        functionSpecificPathsToInclude: pathsToInclude,
    });

    await uploadFunction({ nickname, name, zipFile });

    await updateFunctionConfiguration({

        nickname,
        name,
        handler,
        role,
        environmentVariables,
        timeout,
        memory
    });
};


const getSelectedFunctionData = Object.freeze( () => {
    
    if( !!yargs.argv.functions ) {

        const selectedFunctions = yargs.argv.functions.split( ',' );

        const selectedFunctionData = functionData.filter(
            ({ nickname }) =>  selectedFunctions.includes( nickname )
        );

        return selectedFunctionData;
    }

    return functionData;
});


const deployFunctions = Object.freeze( () => {

    console.log( 'running deployFunctions' );

    return removeNodeModulesAndOldDist().then( () => {

        return installNodeModules({ production: true });

    }).then( () => {

        const selectedFunctionData = getSelectedFunctionData();
        
        return bluebird.map( selectedFunctionData, ({

            nickname,
            name,
            handler,
            role,
            pathsToInclude,
            environmentVariables,
            timeout,
            memory

        }) => {

            return deployFunction({

                nickname,
                name,
                handler,
                role,
                pathsToInclude,
                environmentVariables,
                timeout,
                memory
            });

        }, { concurrency: 10 } );

    }).then( () => {

        return installNodeModules();

    }).then( () => {

        console.log( 'deployFunctions successfully executed' );

    }).catch( err => {

        console.log( 'an error occurred in deployFunctions:', err );
    });
});


deployFunctions();
