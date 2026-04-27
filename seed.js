const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Crypto = require('./models/Crypto');

dotenv.config();

const dummyCryptos = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 64230.50,
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    change24h: 2.5,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3450.75,
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    change24h: 4.1,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 145.20,
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    change24h: 12.4,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.45,
    image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    change24h: -1.2,
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.20,
    image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    change24h: 5.8,
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 18.50,
    image: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    change24h: -0.5,
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Crypto.deleteMany();
    console.log('Cleared existing crypto data');

    await Crypto.insertMany(dummyCryptos);
    console.log('Inserted dummy crypto data');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
