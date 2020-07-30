'use strict';

const {
    utils: {
        redis: {
            getClient,
        },
        stringify
    },
    constants: {
        environment: {
            isProductionMode
        }
    }
} = require( '@bitcoin-api.io/common-private' );


const f = Object.freeze;

const {
    constants: {
        dragonErrorStatusCode
    },
} = require( './localTools' );

const runIpAddressDragonInspection = require(
    './runIpAddressDragonInspection'
);

const getDragonsToInspectBankStatus = require(
    './getDragonsToInspectBankStatus'
);

const getDragonsToMakeSureBankIsOn = require(
    './getDragonsToMakeSureBankIsOn'
);

const getDragonsToInspectTheMegaCode = require(
    './getDragonsToInspectTheMegaCode'
);


module.exports = f( async ({

    queueName,
    event,
    
    necessaryDragonDirective = 1,

    megaCodeIsRequired = true,

    ipAddressMaxRate = 6,
    ipAddressTimeRange = 60 * 1000,
    
    advancedCodeMaxRate = 6,
    advancedCodeTimeRange = 60 * 1000,

    customDragonFunction = async () => {},

}) => {

    const dragonFindings = {};

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        '🐉🐲Dragon Protection Activated🐉🐲\n' +
        '☢️🐑Yes, once again, it is time. ' +
        'Time to unleash the dragons! 🐉🐉🐉🐲🔥🔥🔥🔥🔥 ' +
        `${
            stringify({
                megaCodeIsRequired,
                necessaryDragonDirective,
                queueName
            })
        }`
    );

    event = event || {};

    const maintenanceModeCode = process.env.MAINTENANCE_MODE_CODE || 'off';

    if(
        (maintenanceModeCode !== 'off') &&
        !(
            !!event &&
            !!event.header &&
            (
                event.header.bulltruea6f77ec7df97454f8cd8ea897d7b1182 ===
                maintenanceModeCode
            )
        )
    ) {

        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
            'The API is in maintenance mode and ' +
            'the user is not bulltrueing ⛔️🐄'
        );

        const standardMessage = (
            'This Bitcoin-Api.io API endpoint is ' +
            'unavailable at the moment.'
            // 'This Bitcoin-Api.io API endpoint is ' +
            // 'unavailable at the moment ' +
            // 'due to maintenance. ' +
            // 'This endpoint will be active again ' +
            // 'as soon as possible. We thank you for your patience and ' +
            // 'understanding.'
        );

        const maintenanceModeMessage = process.env.MAINTENANCE_MODE_MESSAGE;

        const message = !maintenanceModeMessage ? standardMessage : (

            standardMessage + ` ${ maintenanceModeMessage }`
        );

        const error = new Error( message );

        error.bulltrue = true;
        error.statusCode = 503;
        throw error;
    }
    
    const ipAddress = (
        !!event.data &&
        !!event.data.ipAddress &&
        event.data.ipAddress
    );

    dragonFindings.ipAddress = ipAddress;

    const eventHeader = (
        !!event.header &&
        event.header
    ) || {};

    const megaCode = (
        
        eventHeader.Token ||
        eventHeader.token ||
        null
    );

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        `Given credential info: ${ stringify({

            ipAddress,
            megaCodeCrazyInfo: (
                
                !!megaCode &&
                (typeof megaCode === 'string') &&
                (megaCode.length > 0) &&
                megaCode.length

            ) || 'no mega code/invalid mega code'
        }) }`
    );

    if(
        !ipAddress ||
        (
            megaCodeIsRequired &&
            !megaCode
        )
    ) {
        
        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
            'missing required values, ROOOOOOARRR, ' +
            'YOU ARE BANISHED!🐲🔥🔥🔥🔥🔥'
        );

        const error = new Error( 'invalid credentials' );

        error.bulltrue = true;
        error.statusCode = dragonErrorStatusCode;
        throw error;
    }

    const redisClient = getClient();

    let errorInCustomDragonFunctionInvocation = null;
    let errorInIpAddressDragonInspection = null;
    let errorInBankStatusDragonInspection = null;
    let errorInBankIsOnOrOffDragonInspection = null;

    try {

        const dragonInspections = [
            
            (async () => {
                try {

                    await customDragonFunction();
                }
                catch( err ) {

                    console.log(
                        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
                        'the customDragonFunction has failed! ' +
                        'Here is the error that has occurred: ' +
                        `${ err }. ` +
                        'Yikes, this is 100% not ideal🐲🐉🔥🔥🔥🔥🔥!'
                    );

                    errorInCustomDragonFunctionInvocation = err;
                }
            })(),

            (async () => {
                try {

                    await getDragonsToMakeSureBankIsOn({

                        redisClient
                    });
                }
                catch( err ) {

                    console.log(
                        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
                        'while the dragons inspected if the ' +
                        'bank is on or off, an error has occurred: ' +
                        `${ err }. WOW, this is insane🐲🐉🔥🔥🔥🔥🔥`
                    );

                    errorInBankIsOnOrOffDragonInspection = err;
                }
            })(),

            (
                isProductionMode ||
                (
                    process.env.SHOULD_CONSIDER_BANK_STATUS_IN_STAGING_MODE ===
                    'yes'
                )
            ) && (async () => {
                
                try {

                    await getDragonsToInspectBankStatus({
                        redisClient,
                    });
                }
                catch( err ) {

                    console.log(
                        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
                        'while the dragons inspected the bank status, ' +
                        'they have determined that an error has occurred: ' +
                        `${ err }. WOW, careful there buddy🐲🐉🔥🔥🔥🔥🔥`
                    );

                    errorInBankStatusDragonInspection = err;
                }
            })(),

            (async () => {
                try {

                    await runIpAddressDragonInspection({
                        redisClient,
                        ipAddress,
                        queueName,
        
                        maxRate: ipAddressMaxRate,
                        timeRange: ipAddressTimeRange,
                    });
                }
                catch( err ) {

                    console.log(
                        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
                        'error occurred in ip address dragon inspection: ' +
                        err +
                        ' - Waiting for other dragon inspections before ' +
                        'throwing this error. (they might error first)🤠'
                    );

                    errorInIpAddressDragonInspection = err;
                }
            })()
        ];

        let errorInMegaCodeDragonInspection = null;
        
        if( megaCodeIsRequired ) {

            dragonInspections.push(

                (async () => {

                    try {
                        
                        await getDragonsToInspectTheMegaCode({

                            megaCode,
                            queueName,
                            redisClient,
                            dragonFindings,
                            advancedCodeMaxRate,
                            advancedCodeTimeRange,
                            necessaryDragonDirective,
                        });
                    }
                    catch( err ) {

                        console.log(
                            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
                            'error occurred in mega code dragon inspection: ' +
                            err +
                            ' - Waiting for other dragon inspections before ' +
                            'throwing this error. (they might error first)🤠'
                        );

                        errorInMegaCodeDragonInspection = err;
                    }
                })()
            );
        }

        await Promise.all( dragonInspections );

        [
            errorInCustomDragonFunctionInvocation,
            errorInBankIsOnOrOffDragonInspection,
            errorInBankStatusDragonInspection,
            errorInIpAddressDragonInspection,
            errorInMegaCodeDragonInspection

        ].forEach( possibleError => {

            if( !!possibleError ) {

                throw possibleError;
            }
        });

        redisClient.quit();

        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
            'The guard dragons have not eaten you🐟🐠🍣🤠🐉🐲(wow, lucky). ' +
            'You may enter, for now... ' +
            'Beginning dragon protection executed successfully.🦖🍄'
        );

        return dragonFindings;
    }
    catch( err ) {

        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
            'error in redis based functions, wow, ' +
            'quitting redis.'
        );

        redisClient.quit();

        throw err;
    }
});
