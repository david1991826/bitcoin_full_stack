Object.freeze( async ({

    e,
    values: {
        amountDonated
    }
    
}) => {
    
    // const getAmountDonated = Object.freeze( async () => {
            
    //     try {

    //         const {
            
    //             balanceData: { amount }
                
    //         } = await bitcoinApi.getTokenInfo();

    //         return `${ amount } BTC`;
    //     }
    //     catch( err ) {

    //         console.log( 'error in getAmountDonated:', err );

    //         return 'error';
    //     }
    // });

    // const amountDonated = await getAmountDonated();

    return Object.freeze( () => {

        return e(
            'div',
            {
                style: {

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 35,
                },
            },
            e(
                'div',
                {
                    style: {

                        width: 260,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#019BE5',
                        padding: 25,
                        borderRadius: 20,
                    },   
                },
                'Amount Donated',
                e(
                    'div',
                    {
                        style: {
        
                            width: '90%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'black',
                            padding: 15,
                            borderRadius: 10,
                            marginTop: 10,
                        },
                    },
                    amountDonated
                )
            )
        );
    })
})
