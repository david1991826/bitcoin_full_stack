export default password => {

    const passwordIsValid = (

        !!password &&
        (typeof password === 'string') &&
        (password.length >= 8) &&
        (password.length <= 100)
    );

    return passwordIsValid;
};
