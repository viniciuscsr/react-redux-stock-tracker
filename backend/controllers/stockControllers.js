const asyncHandler = require('express-async-handler');
const pool = require('../config/db');
const axios = require('axios');

//@desc New transaction
//@route POST /api/stocks/
//@access private

const createTransaction = asyncHandler(async (req, res) => {
  const { symbol, shares, avgPrice, type } = req.body;
  // Reversing the shares sign if equals to sell
  // if (type === 'sell') {
  //   shares = shares * -1;
  // }
  // Inserting transaction into the db
  await pool.query(
    'INSERT INTO portifolio(symbol, shares, avg_price, userid, type) VALUES($1, $2, $3, $4, $5)',
    [symbol, shares, avgPrice, req.user.id, type]
  );

  res.json({ success: true });
});

//@desc get portifolio data
//@route GET /api/stocks/
//@access private

const getPortifolio = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const portifolio = [];

  const stocks = await pool.query(
    'SELECT DISTINCT symbol FROM portifolio WHERE userid=$1',
    [req.user.id]
  );

  for (let i = 0; i < stocks.rows.length; i++) {
    let { symbol } = stocks.rows[i];

    let buySharesTotal = await pool.query(
      'SELECT SUM (shares) AS total FROM portifolio WHERE userid=$1 AND symbol=$2 AND type=$3',
      [userId, symbol, 'buy']
    );

    let sellSharesTotal = await pool.query(
      'SELECT SUM (shares) AS total FROM portifolio WHERE userid=$1 AND symbol=$2 AND type=$3',
      [userId, symbol, 'sell']
    );

    let totalShares =
      buySharesTotal.rows[0].total - sellSharesTotal.rows[0].total;

    let stockPrice = await axios.get(
      `https://api.tiingo.com/tiingo/daily/${symbol}/prices?token=${process.env.TIINGO_TOKEN}`
    );

    let stock = {
      symbol: stocks.rows[i].symbol,
      totalShares,
      price: stockPrice.data[0].adjClose,
    };

    portifolio.push(stock);
  }
  res.json(portifolio);
});

module.exports = { createTransaction, getPortifolio };
