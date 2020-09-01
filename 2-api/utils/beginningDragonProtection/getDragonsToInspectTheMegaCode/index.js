'use strict';

const authorizeUser = require( '../../auth/authorizeUser' );

const runAdvancedCodeDragonInspection = require(
    '../runAdvancedCodeDragonInspection'
);

const ensureTheUserCompliesWithTheDragonDirective = require(
    './ensureTheUserCompliesWithTheDragonDirective'
);

// const {
//     utils: {
//         stringify,
//     }
// } = require( '@npm.m.stecky.efantis/commonprivate' );

const f = Object.freeze;


module.exports = f( async ({

    megaCode,
    queueName,
    redisClient,
    dragonFindings,
    advancedCodeMaxRate,
    advancedCodeTimeRange,
    necessaryDragonDirective,

}) => {

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'running 🐊getDragonsToInspectTheMegaCode🐊'
    );

    const { user } = await authorizeUser({

        returnCode: megaCode
    });

    ensureTheUserCompliesWithTheDragonDirective({

        user,
        necessaryDragonDirective,
        dragonFindings
    });

    await runAdvancedCodeDragonInspection({
        redisClient,
        megaCode,
        queueName,

        maxRate: advancedCodeMaxRate,
        timeRange: advancedCodeTimeRange,
    });

    dragonFindings.user = user;

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 -\n' +
        'Yes, the dragon code has been inspected and ' +
        'everything is going as planned.☢️🐑'
    );
});
