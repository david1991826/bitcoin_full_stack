export default Object.freeze( initializationValues => {

    if(
        !initializationValues ||
        (typeof initializationValues !== 'object')
    ) {

        throw new Error(
            'initialization error: missing initialization values'
        );
    }

    const values = Object.assign(

        {},
        initializationValues
    );

    return values;
});