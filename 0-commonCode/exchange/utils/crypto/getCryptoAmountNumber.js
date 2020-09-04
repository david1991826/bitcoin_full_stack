'use strict';

const toFixedConstant = 5;
const amountMultiplier = 100000;


module.exports = Object.freeze( amount => {

    const cryptoAmount = Number(
        (
            Math.round(
                Number(amount) * amountMultiplier
            ) / amountMultiplier
        ).toFixed( toFixedConstant )
    );

    return cryptoAmount;
});
