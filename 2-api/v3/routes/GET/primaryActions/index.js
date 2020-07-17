'use strict';

const {
    utils: {
        redis: {
            getClient
        },
    },
} = require( '@npm.m.stecky.efantis/commonprivate' );

const gatherData = require( './gatherData' );
const {
    business: { getIfApiIsActive, getIfApiIsOnData }
} = require( '../../../utils' );


module.exports = Object.freeze( async ({

    event,

}) => {
    
    const redisClient = getClient();

    const primaryActions = [

        (async () => {
            
            try {

                const apiIsActive = await getIfApiIsActive({

                    redisClient
                });

                return apiIsActive;
            }
            catch( err ) {

                console.log(
                    'error in determining if api is active:', err,
                    '- setting apiIsActive status to false'
                );

                return false;
            }
        })(),

        (async () => {

            try {

                const {

                    bitcoinApiIsOn,
                    // bitcoinApiIsOffReason,

                } = await getIfApiIsOnData({

                    redisClient
                });

                return bitcoinApiIsOn;
            }
            catch( err ) {
        
                console.log(
                    '🧐error in seeing if bitcoin API is off:', err
                );
            }       
        })(),

        (async () => {

            try {

                const shouldNotGatherData = (

                    !!event &&
                    !!event.header &&
                    !!event.header[
                        process.env.WEBSITE_DO_NOT_GATHER_DATA_KEY
                    ] && (
                        event.header[
                            process.env.WEBSITE_DO_NOT_GATHER_DATA_KEY
                        ] === process.env.WEBSITE_DO_NOT_GATHER_DATA_SECRET
                    )
                );

                if( shouldNotGatherData ) {

                    console.log( '⛔️not gathering data' );

                    return;
                }

                console.log( 'gathering data' );

                const ipAddress = (
                    !!event &&
                    !!event.ipAddress &&
                    event.ipAddress
                );
        
                if( !!ipAddress ) {

                    const deviceOrMaybeOtherCoolData = (
        
                        !!event &&
                        !!event.deviceOrMaybeOtherCoolData &&
                        event.deviceOrMaybeOtherCoolData
                    );
        
                    await gatherData({
                    
                        redisClient,
                        ipAddress,
                        deviceOrMaybeOtherCoolData,
                    });
                }
            }
            catch( err ) {
        
                console.log( '🧐error in ip address tracking:', err );
            }       
        })()
    ];

    const [
        
        apiIsActive,
        bitcoinApiIsOn                  

    ] = await Promise.all( primaryActions );

    redisClient.quit();

    const apiIsInOmegaForm = (
        apiIsActive &&
        bitcoinApiIsOn
    );

    return {

        apiIsInOmegaForm,
    };
});
