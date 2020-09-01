'use strict';

const {
    utils: {
        stringify
    },
} = require( '@bitcoin-api.io/common-private' );


const getDragonDirective = Object.freeze( ({

    user

}) => {

    if(
        !!user.metadata.isHumanInformation &&
        !!user.metadata.isHumanInformation.humanIpAddress &&
        !!user.metadata.isHumanInformation.humanScore &&
        !!user.metadata.isHumanInformation.isHuman &&
        !!user.metadata.isHumanInformation.timeOfHumanProof &&
        !!user.metadata.privacyPolicy &&
        !!user.metadata.privacyPolicy.agrees &&
        !!user.metadata.privacyPolicy.ipAddressOfAgreement &&
        !!user.metadata.privacyPolicy.timeOfAgreement &&
        !!user.metadata.tos &&
        !!user.metadata.tos.agrees &&
        !!user.metadata.tos.ipAddressOfAgreement &&
        !!user.metadata.tos.timeOfAgreement
    ) {

        return 2;
    }

    return 1;
});


module.exports = Object.freeze( ({

    user

}) => {

    console.log(
        
        'running 🔥🦖getDragonDirective🐊🔥 - ' +
        '🐉🐲Getting the dragon directive for the following user: ' +
        stringify({

            user,
        })        
    );

    const dragonDirective = getDragonDirective({

        user
    });

    console.log(
        '🔥🦖getDragonDirective🐊🔥 executed successfully for ' +
        `user ${ user.userId } - ` +
        `this user has 🎇🐉🐲dragon directive🐲🐉🎇 ` +
        `${ dragonDirective }.`
    );

    return dragonDirective;
});
