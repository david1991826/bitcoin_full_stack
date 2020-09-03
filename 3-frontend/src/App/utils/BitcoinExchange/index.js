import { default as validateAndGetInitializationValues } from './validateAndGetInitializationValues';
import { default as makeApiCall } from '../makeApiCall';


export default class BitcoinExchange {

    constructor( initializationValues ) {

        Object.assign(

            this,
            validateAndGetInitializationValues( initializationValues )
        );
    }

    async createUser({

        email,
        password,
        // googleCode

    }) {

        return await makeApiCall({

            resource: 'exchange-users',
            method: 'POST',
            body: {
                email,
                password,
                // googleCode,
            },
        });
    }

    async verifyEmail({

        email,
        password,
        verifyEmailCode,

    }) {

        return await makeApiCall({

            resource: 'verify-user',
            method: 'POST',
            body: {
                email,
                password,
                verifyEmailCode,
            },
        });
    }

    async login({

        email,
        password,

    }) {

        return await makeApiCall({

            resource: 'login',
            method: 'POST',
            body: {
                email,
                password,
            },
        });
    }

    async getUser({

        userId,
        loginToken,

    }) {

        return await makeApiCall({

            resource: `exchange-users/${ userId }`,
            method: 'GET',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async withdraw({

        userId,
        amount,
        address,
        loginToken,
        fullWithdraw

    }) {

        return await makeApiCall({

            resource: 'withdraws',
            method: 'POST',
            body: {
                amount,
                address,
                fullWithdraw,
            },
            headers: {

                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async signOut({

        userId,
        loginToken

    }) {

        return await makeApiCall({

            resource: 'logout',
            method: 'POST',
            body: {},
            headers: {

                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async deleteUser({

        userId,
        loginToken

    }) {

        return await makeApiCall({

            resource: `exchange-users/${ userId }`,
            method: 'DELETE',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
            },
        });
    }

    async exchange({

        userId,
        loginToken,
        amountWantedInCryptos,
        amountWantedInBitcoin,

    }) {

        const values = {

            resource: 'exchanges',
            method: 'POST',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
            },
            body: {}
        };

        if( !!amountWantedInCryptos ) {

            Object.assign(

                values.body,
                {
                    type: 'btcToCrypto',
                    data: {
                        amountInCryptoWanted: Number( amountWantedInCryptos ),
                    }
                }
            );
        }
        else {

            Object.assign(

                values.body,
                {
                    type: 'cryptoToBTC',
                    data: {
                        amountInBitcoinWanted: Number( amountWantedInBitcoin ),
                    }
                }
            );
        }
    
        return await makeApiCall( values );
    }

    async enchantedLuck({

        userId,
        loginToken,
        amount,
    }) {

        return await makeApiCall({

            resource: 'dreams',
            method: 'POST',
            headers: {

                'login-token': loginToken,
                'user-id': userId,
            },
            body: {
                amount: Number( amount ),
            }
        });
    }
}