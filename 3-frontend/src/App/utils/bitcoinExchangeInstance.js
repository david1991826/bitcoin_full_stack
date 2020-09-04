import BitcoinExchange from './BitcoinExchange';


// const TestBitcoinExchange


// const bitcoinExchange = !!process.env.TEST_MODE ? (

// 	new BitcoinExchange({})
// ) : ;	


const bitcoinExchange = new BitcoinExchange({});

export default bitcoinExchange;