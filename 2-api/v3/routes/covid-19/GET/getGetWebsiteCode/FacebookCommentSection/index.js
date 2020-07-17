Object.freeze( ({

    e
    
}) => {

    return Object.freeze( () => {

        return e(
            'div',
            {
                style: {

                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25,
                    paddingTop: 20,
                    paddingBottom: 20,
                    backgroundColor: 'pink',
                    backgroundColor: 'white',
                    borderRadius: 20,
                    maxWidth: 600,
                    minWidth: 300,
                    width: '100%',
                    alignSelf: 'center',
                }
            },
            e(
                'div',
                {
                    className: 'fb-comments',
                    'data-href': 'https://bitcoin-api.io/covid-19',
                    'data-numposts': '25',
                    'data-width': '100%'
                }
            )
        );
    })
})
