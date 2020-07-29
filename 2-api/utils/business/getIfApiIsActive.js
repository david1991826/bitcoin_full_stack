'use strict';

const stringify = require( '../stringify' );

const {
    constants: {
        redis: {
            streamIds: {
                bankStatusQueueId,
            }
        },
        computerServerServiceNames: {
            monkeyPaw,
            juiceCamel,
            refreshingDrank
        },
        megaServerIdToMegaServerData
    },
    utils: {
        redis: {
            streams: {
                getKeyValues,
                // getOperationTime,
                xRangeWithPagination
            }
        },
        server: {
            // getServiceNameStreamKey,
            decodeServiceNameStreamKey
        }
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );

const f = Object.freeze;

const megaServerIds = Object.keys( megaServerIdToMegaServerData );

const maxSilenceTime = 5 * 60 * 1000;


const getIfBankIsOpen = Object.freeze( ({ bankIsActiveEvents }) => {
    
    const kTigerTracker = new Set();
    const omegaTigerSet = new Set();
    const feeTigerCollection = new Set();

    for( let i = (bankIsActiveEvents.length - 1); i >= 0; i-- ) {

        const bankIsActiveEvent = bankIsActiveEvents[ i ];

        const {
            // timeKey,
            keyValues: {
                serviceNameStreamKey
            }
        } = bankIsActiveEvent;

        const {
            
            megaServerId,
            serviceName

        } = decodeServiceNameStreamKey({

            serviceNameStreamKey
        });

        if( serviceName === monkeyPaw ) {

            kTigerTracker.add( megaServerId );
        }
        else if( serviceName === juiceCamel ) {

            omegaTigerSet.add( megaServerId );
        }
        else if( serviceName === refreshingDrank ) {

            feeTigerCollection.add( megaServerId );
        }
        else {

            throw new Error(
                'getIfBankIsClosed error: ' +
                `invalid serviceNameStreamKey - ${ serviceNameStreamKey }`
            );
        }

        if(
            // (omegaTigerSet.size === 1) && // NOTE: temporary used for temporary commenting //
            (omegaTigerSet.size === megaServerIds.length) &&
            (kTigerTracker.size === 1) && // NOTE: used for temporary commenting // 
            (feeTigerCollection.size === 1)
        ) {

            return true;
        }
    }

    return false;
});


module.exports = f( async ({

    redisClient

}) => {

    const thePowerOfNow = Date.now();

    // const searchStart = thePowerOfNow - maxServiceSilenceTime;
    const searchStart = thePowerOfNow - maxSilenceTime;
    const searchEnd = thePowerOfNow;

    console.log(
        'running getIfApiIsActive ' +
        stringify({
            thePowerOfNow,
            searchStart,
            searchEnd,
        })
    );

    const bankIsActiveEvents = (
        
        await xRangeWithPagination({

            redisClient,
            startTime: searchStart,
            endTime: searchEnd,
        
            queueName: bankStatusQueueId,
            paginationCount: 500,
        })

    ).map(

        ([ timeKey, keyValueList ]) => ({
            timeKey,
            keyValues: getKeyValues({ keyValueList }),
        })
    );

    const bankIsOpen = getIfBankIsOpen({ bankIsActiveEvents });

    console.log(
        'getIfApiIsActive - executed successfully ' +
        `Api is Active?: ${ bankIsOpen }`
    );

    return bankIsOpen;
});
