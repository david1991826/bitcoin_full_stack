Object.freeze( ({

    e,
    // getComponent
    
}) => () => {

    return e(
        'div',
        {
            style: {

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
        e(
            'img',
            {
                // src: 'https://bitcoin-api.s3.amazonaws.com/qr_codes/3PpxGZrQD2wCmrJYu5E5iQJQ1xRD4JX7MB.jpg'
                src: process.env.CORONA_VIRUS_DONATION_ADDRESS_QR_CODE_URL,
                style: {

                    backgroundColor: 'white',
                    // width: 200,
                    // height: 200,
                    marginTop: 38
                }
            }
        ),
        e(
            'div',
            {
                style: {
                    marginTop: 15,
                    textAlign: 'center'
                }
            },
            process.env.CORONA_VIRUS_DONATION_ADDRESS
        )
    );
})
