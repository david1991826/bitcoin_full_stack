'use strict';


module.exports = Object.freeze(
    amount => Number(
        (Math.round( Number(amount) * 100000000 ) / 100000000).toFixed(8)
    )
);