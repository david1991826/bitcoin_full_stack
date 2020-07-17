'use strict';

const {
    utils: {
        getDragonDirective
    }
} = require( '../localTools' );

const {
    utils: {
        stringify,
    }
} = require( '@npm.m.stecky.efantis/commonprivate' );


module.exports = Object.freeze(({

    user,
    necessaryDragonDirective,
    dragonFindings

}) => {

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        'running 🐊ensureTheUserCompliesWithTheDragonDirective🐊 - ' +
        stringify({
            userId: user.userId,
            necessaryDragonDirective
        })
    );

    const dragonDirective = getDragonDirective({ user });

    if( dragonDirective < necessaryDragonDirective ) {

        console.log(
            '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
            '🐊ensureTheUserCompliesWithTheDragonDirective🐊 - ' +
            'an error occurred, the following comparison was not met: ' +
            `dragonDirective(${ dragonDirective }) >= `+
            `necessaryDragonDirective(${ necessaryDragonDirective }) ` +
            stringify({
                userId: user.userId,
                necessaryDragonDirective
            })
        );

        const err = new Error(
            
            'This action requires an activated token. ' +
            `Please visit the webpage ` +
            `${ process.env.BITCOIN_API_BASE_URL }/token-activator to ` +
            'activate your token, thank you for your understanding. ' +
            'Be bitcoin happy with Bitcoin-Api!'
        );

        err.statusCode = 401;

        err.bulltrue = true;

        throw err;
    }

    dragonFindings.dragonDirective = dragonDirective;

    console.log(
        '🐉🐲Beginning Dragon Protection🐉🐲 - ' +
        '🐊ensureTheUserCompliesWithTheDragonDirective ' +
        'executed successfully🐊 - ' +
        stringify({
            userId: user.userId,
            necessaryDragonDirective
        })
    );
});
