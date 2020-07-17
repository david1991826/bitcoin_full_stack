'use strict';

const f = Object.freeze;


module.exports = f({
    withdraws: f({
        statuses: f({
            loading: "loading",
            error: "error",
            good: "good"
        }),
    })
});
