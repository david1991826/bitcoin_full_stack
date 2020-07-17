Object.freeze( ({

    e
    
}) => () => {

    return e(
        'h2',
        {
            style: {
                width: '100%',
                textAlign: 'center',
                fontSize: 20,
                padding: 10,
            }
        },
        `What's an API? What's a Bitcoin API?`
    );
})