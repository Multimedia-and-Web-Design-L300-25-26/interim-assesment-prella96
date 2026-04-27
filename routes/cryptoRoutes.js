const express = require('express');
const router = express.Router();
const Crypto = require('../models/Crypto');

// @route   GET /api/crypto
// @desc    Get all tradable cryptocurrencies
router.get('/', async (req, res) => {
  try {
    const cryptos = await Crypto.find({});
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/crypto/gainers
// @desc    Get top gainers sorted by highest percentage increase
router.get('/gainers', async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 });
    res.json(gainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/crypto/new
// @desc    Get new listings sorted by newest first
router.get('/new', async (req, res) => {
  try {
    const newCryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json(newCryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/crypto
// @desc    Add a new cryptocurrency
router.post('/', async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    const crypto = new Crypto({
      name,
      symbol,
      price,
      image,
      change24h,
    });

    const createdCrypto = await crypto.save();
    res.status(201).json(createdCrypto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
