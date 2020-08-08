'use strict';

const getFeeToPayFromFeeData = require( './getFeeToPayFromFeeData' );
const stringify = require( '../../stringify' );


const getMetaFeeToPay = Object.freeze( (

    shouldIncludeFeeInAmount,
    ...getFeeToPayFromFeeDataArgs

) => {
    
    if( shouldIncludeFeeInAmount ) {

        const modifiedGetFeeToPayFromFeeDataArgs = [
            ...getFeeToPayFromFeeDataArgs
        ];

        modifiedGetFeeToPayFromFeeDataArgs[0] = Object.assign(

            {},
            modifiedGetFeeToPayFromFeeDataArgs[0],
            {
                shouldReturnAdvancedResponse: true
            }
        );

        const {

            holyFee

        } = getFeeToPayFromFeeData( ...modifiedGetFeeToPayFromFeeDataArgs );

        return holyFee;
    }

    return getFeeToPayFromFeeData( ...getFeeToPayFromFeeDataArgs );
});


module.exports = Object.freeze( (

    metaGetFeeToPayFromFeeDataOptions,
    ...getFeeToPayFromFeeDataArgs
) => {

    const logValues = (
        !metaGetFeeToPayFromFeeDataOptions.pleaseDoNotLogAnything
    );

    if( logValues ) {

        console.log(
            'Running 🤠META😈⚔️🐸 metaGetFeeToPayFromFeeData🚨' +
            '🔥🔥🔥🔥🔥🔥🔥🔥🔥' +
            ` here are the ultra values: ${ 
                stringify({
                    metaGetFeeToPayFromFeeDataOptions,
                    getFeeToPayFromFeeDataArgs: [
                        ...getFeeToPayFromFeeDataArgs
                    ]
                })
            }`
        );
    }

    const metaFeeToPay = getMetaFeeToPay(

        metaGetFeeToPayFromFeeDataOptions.shouldIncludeFeeInAmount,
        ...getFeeToPayFromFeeDataArgs
    );

    // const metaFeeToPay = (

    //     metaGetFeeToPayFromFeeDataOptions.shouldIncludeFeeInAmount
        
    // ) ? 0 : getFeeToPayFromFeeData( ...getFeeToPayFromFeeDataArgs );


    if( logValues ) {

        console.log(
            '🌲🤠META😈⚔️🐸 metaGetFeeToPayFromFeeData🚨' +
            '🔥🔥🔥🔥🔥🔥🔥🔥🔥' +
            ` executed successfully, here is the power result: ${ 
                stringify({
                    feeToPay: metaFeeToPay,
                })
            }`
        );
    }

    return metaFeeToPay;
});
