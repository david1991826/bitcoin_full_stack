'use strict';

const queueIdSeparator = '___';


module.exports = Object.freeze(
    ({ type, id }) => (
        `queue${ queueIdSeparator }` +
        `${ type }${ queueIdSeparator }` +
        `${ type }${ id }`
    )
);