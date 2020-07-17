Object.freeze( ({

    e
    
}) => () => {

    return e(
        'div',
        {
            style: {
                fontSize: 18,
                padding: 10,
            }
        },
        (
            'To donate bitcoin to fight ' +
            'COVID-19, please send bitcoin to the address below. ' +
            'This bitcoin will be used entirely to support charities ' +
            'helping to end the pandemic. ' +
            'Status updates will be posted below.'
        )
    );
})
