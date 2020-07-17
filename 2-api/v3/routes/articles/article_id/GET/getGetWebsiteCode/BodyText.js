Object.freeze( ({

    e
    
}) => () => {

    const getHeading = ({

        text,

    }) => {

        return e(
            'h2',
            {
                style: {
                    fontSize: 18,
                    padding: 10,
                    width: '100%',
                }
            },
            text
        );
    };

    const getParagraph = ({

        text,
        indent = false,

    }) => {

        return e(
            'div',
            {
                style: {
                    fontSize: 16,
                    padding: 10,
                    width: '100%',
                    marginLeft: indent ? 40 : undefined,
                }
            },
            text
        );
    };

    return e(
        'div',
        {
            style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                maxWidth: 600,
            }
        },
        getHeading({
            
            text: `APIs — the backbone of all our major tech companies.`
        }),
        getParagraph({

            text: `If you work in the tech industry or even in the finance industry, it’s likely that you’ve at least heard this tech term being used, API, sometimes pronounced “A”, “P”, “I”, letter-by-letter, or other times it can be called “Api”, rhyming with “happy”. Whatever you choose to call it, APIs are central to all of the big tech companies and to their business operations. This article aims to shed some light on the sometimes misunderstood or the not fully understood topic — APIs.`,
        }),
        getParagraph({

            text: `It should be noted that the term API sometimes refers to different things for developers. This article focuses on the current mainstream usage of the term which refers to APIs that are accessed through internet requests (e.g. HTTPS requests).`,
        }),
        getHeading({

            text: `What’s an API?`,
        }),
        getParagraph({

            text: `An application programming interface, most commonly known as and referred to as an API, is a tool used by developers to code websites, apps, and other technology such as IoT device software. This tool used by developers accesses and edits data from everything including pictures, to bank transactions, and even articles like this one. This data is stored on companies’ computers which are known as servers. Internet requests are sent to APIs which perform operations on companies’ servers. These requests are usually called “API calls”. The API-triggered computer server operations result in the desired business operations. APIs, which are tools for developers, are also coded themselves by developers.`
        }),
        getParagraph({

            text: `In the context of apps, APIs can be thought of as the layer between the app itself on your device and the computer servers that store and that manage your data. Your app (i.e. the frontend) makes requests to APIs which receive and process those requests accordingly by performing the appropriate backend computer server operations. There are different types of requests that can be made although requests can either be categorized as requests to read or as requests to write data, which is true for all APIs. APIs for apps are usually coded to receive several different types of requests that provide the necessary app functionality.`
        }),
        getHeading({

            text: `Simple social media app API call examples:`
        }),
        getParagraph({

            text: `• app makes a request to create a profile (write data)`,
            indent: true,
        }),
        getParagraph({

            text: `• app makes a request to retrieve the profile description (read data)`,
            indent: true,
        }),
        getParagraph({

            text: `• app makes a request to update the profile description (write data)`,
            indent: true,
        }),
        getParagraph({

            text: `• app makes a request to delete the profile (write data, can still be categorized as a write request, in this case writing null data)`,
            indent: true,
        }),
        getParagraph({

            text: `Uber example: when you press the “Confirm Express Pool” button on your Uber app, the app has been coded to trigger your device to make an API call, or perhaps multiple, to the Uber API. The Uber API receives these requests then triggers Uber’s computer servers which perform the necessary operations. The operations will save in the Uber system that you’ve confirmed you want a ride and the operations will also trigger the next step(s) in the ride-share sequence.`
        }),
        getHeading({

            text: `What’s a Bitcoin API?`
        }),
        getParagraph({

            text: `A “bitcoin API” can be considered to be the same as any other API except for the principles are applied to bitcoin. The term “bitcoin API” currently isn’t a generally accepted or a commonly used term and it doesn’t actually refer to one specific thing. An “API that interacts with the bitcoin network” is a more literal way of describing it, think “weather API” vs “API that interacts with weather forecast data”.`
        }),
        getParagraph({

            text: `Bitcoin APIs are tools that help developers perform operations on certain data, in this case, bitcoin data (i.e. the bitcoin network). Bitcoin APIs allow developers to interact with the bitcoin network in a concrete way using API calls. Developers use these bitcoin APIs to code bitcoin related functionalities into their technology such as the ability to receive, to store, and to send bitcoins.`
        }),
        getHeading({

            text: `The Bright Future of APIs`
        }),
        getParagraph({

            text: `APIs are the foundation of our modern tech-driven economy. With time, APIs will surely evolve and will surely change forms although whatever form they take on, their importance will surely increase. This increased importance is due to the business implications of APIs being foundational to tech businesses combined with the fact that all businesses need to adapt to using tech in some way or another to survive in this modern tech-driven economy. This adaptation towards using tech in all businesses implies APIs will be a key element in shaping our future.`
        }),
        getParagraph({

            text: `Bitcoin-Api.io provides a simple-yet-robust bitcoin API to help developers build technology that has bitcoin integrations. This bitcoin API allows developers to add bitcoin sending and receiving functionality to websites and to apps in a very simple way.`
        }),
        getParagraph({

            text: `Check out the official Bitcoin-Api.io documentation on GitHub here:`
        }),
        e(
            'div',
            {
                style: {

                    width: '100%',

                    display: 'flex',
                    flexDirection: 'row-wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                }
            },
            e(
                'img',
                {
                    src: 'https://bitcoin-api.s3.amazonaws.com/images/icons/octoCat.png',
                    maxWidth: 200,
                    width: '50%',
                    // height: 100,
                }
            ),
            e(
                'a',
                {
                    target: '_blank',
                    href: 'https://github.com/bitcoin-api/bitcoin-api',
                    style: {

                        // width: '100%',
                        textAlign: 'center',
                        fontSize: 25,
                        padding: 20,
                    }
                },
                `Bitcoin-Api.io on GitHub`
            )
        )
    );
})


/*


*/