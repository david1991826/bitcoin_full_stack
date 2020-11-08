'use strict';

const {
    constants: {
        aws: {
            database: {
                tableNames: {
                    METADATA
                },
                metadataPartitionKeyValues: {
                    onAndOffSwitch
                }
            }
        },
    },
    utils: {
        stringify,
        aws: {
            dino: {
                getDatabaseEntry
            },
        },
        javascript: {
            jsonEncoder
        }
    }
} = require( '@bitcoin-api/full-stack-api' );

const defaultOffReasonMessage = (

    'The Bitcoin-Api.io API is currently not active. ' +
    'Please try your request again later. ' +
    'Your bitcoin are always secure with Bitcoin-Api.io.'  
);


const getCacheOnAndOffStatusRhinoPond = Object.freeze( ({

    bitcoinAPIIsOn,
    bitcoinAPIIsOffReason = null,

}) => {

    const rawRhinoPond = {

        bitcoinAPIIsOn,
        bitcoinAPIIsOffReason,
        rhinoTime: Date.now()    
    };

    console.log(
        `getCacheOnAndOffStatus - executed successfully
        
        getCacheOnAndOffStatusRhinoPond
            - returning the json encoded version of ${ stringify({
            rawRhinoPond
        }) }`
    );
  
    const rhinoPond = jsonEncoder.encodeJson( rawRhinoPond );

    return rhinoPond;
});


module.exports = Object.freeze( async () => {
    
    console.log( 'running getCacheOnAndOffStatus' );

    try {
        
        const onAndOffSwitchData = (await getDatabaseEntry({

            tableName: METADATA,
            value: onAndOffSwitch,
        })) || {};
    
        const bitcoinApiIsOff = !onAndOffSwitchData.bitcoinAPIIsOn;

        if( bitcoinApiIsOff ) {

            console.log( 'getCacheOnAndOffStatus - bitcoin api is off' );

            return getCacheOnAndOffStatusRhinoPond({

                bitcoinAPIIsOn: false,
                bitcoinAPIIsOffReason: (
                    
                    onAndOffSwitchData.bitcoinAPIIsOffReason ||
                    defaultOffReasonMessage
                ),
            });
        }

        console.log( 'getCacheOnAndOffStatus - bitcoin api is on' );

        return getCacheOnAndOffStatusRhinoPond({
            
            bitcoinAPIIsOn: true
        });
    }
    catch( err ) {

        console.log( 'an error occurred in getCacheOnAndOffStatus:', err );

        return getCacheOnAndOffStatusRhinoPond({

            bitcoinAPIIsOn: false,
            bitcoinAPIIsOffReason: defaultOffReasonMessage,
        });      
    }
});