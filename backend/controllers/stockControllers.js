const asyncHandler = require('express-async-handler');
const pool = require('../config/db');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

//@desc New transaction
//@route POST /api/stocks/
//@access private

const createTransaction = asyncHandler(async (req, res) => {
  const { symbol, shares, avgPrice, type } = req.body;

  try {
    await axios.get(
      `https://api.tiingo.com/tiingo/daily/${symbol}/prices?token=${process.env.TIINGO_TOKEN}`
    );
    await pool.query(
      'INSERT INTO portifolio(symbol, shares, avg_price, userid, type) VALUES($1, $2, $3, $4, $5)',
      [symbol, shares, avgPrice, req.user.id, type]
    );

    res.json({ success: true });
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail);
    }
  }
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
      id: uuidv4(),
      symbol: stocks.rows[i].symbol,
      totalShares,
      price: stockPrice.data[0].adjClose,
    };

    portifolio.push(stock);
  }
  res.json(portifolio);
});

//@desc update transaction
//@route PUT /api/stocks/transactions/:transactionId
//@access private

const updateTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;
  const { shares, avgPrice, type } = req.body;

  const transaction = await pool.query(
    'UPDATE portifolio SET shares=($1), avg_price=($2), type=($3) WHERE transactionid=($4)',
    [shares, avgPrice, type, transactionId]
  );

  if (transaction.rowCount) {
    res.json({ success: true });
  } else {
    res.status(404);
    throw new Error('Transaction not found');
  }
});

//@desc delete transaction
//@route DELETE /api/stocks/transactions/:transactionId
//@access private

const deleteTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  const transaction = await pool.query(
    'DELETE FROM portifolio WHERE transactionid=($1)',
    [transactionId]
  );

  if (transaction.rowCount) {
    res.json({ success: true });
  } else {
    res.status(404);
    throw new Error('Transaction not found');
  }
});

//@desc get transaction by id
//@route GET /api/stocks/transactions/:transactionId
//@access private

const getTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  const transaction = await pool.query(
    'SELECT * FROM portifolio WHERE transactionid=($1)',
    [transactionId]
  );

  if (transaction.rowCount) {
    res.json(transaction.rows[0]);
  } else {
    res.status(404);
    throw new Error('Transaction not found');
  }
});

//@desc get transactions by symbol
//@route GET /api/stocks/:symbol
//@access private

const getStockData = asyncHandler(async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const userId = req.user.id;

  const price = await axios.get(
    `https://api.tiingo.com/tiingo/daily/${symbol}/prices?token=${process.env.TIINGO_TOKEN}`
  );

  const news = await axios.get(
    `https://newsapi.org/v2/everything?q=${symbol}&language=en&domains=finance.yahoo.com,fool.com,cnbc.com,investors.com&apiKey=${process.env.NEWS_API_KEY}`
  );

  const transactions = await pool.query(
    'SELECT * FROM portifolio WHERE userid=$1 AND symbol=$2',
    [userId, symbol]
  );

  const buyShares = await pool.query(
    'SELECT SUM (shares) AS total FROM portifolio WHERE userid=$1 AND symbol=$2 AND type=$3',
    [userId, symbol, 'buy']
  );

  const sellShares = await pool.query(
    'SELECT SUM (shares) AS total FROM portifolio WHERE userid=$1 AND symbol=$2 AND type=$3',
    [userId, symbol, 'sell']
  );

  const totalShares = buyShares.rows[0].total - sellShares.rows[0].total;

  const stockData = {
    id: uuidv4(),
    symbol,
    price: price.data[0].adjClose,
    news: news.data.articles,
    transactions: transactions.rows,
    totalShares,
  };

  res.json(stockData);
});

//@desc get top headlines
//@route GET /api/stocks/top-headlines
//@access public

const getTopHeadlines = asyncHandler(async (req, res) => {
  const { data } = await axios.get(
    `https://newsapi.org/v2/everything?language=en&domains=finance.yahoo.com,fool.com,cnbc.com,investors.com&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
  );

  res.json(data.articles);
});

module.exports = {
  createTransaction,
  getPortifolio,
  updateTransaction,
  deleteTransaction,
  getTransaction,
  getStockData,
  getTopHeadlines,
};
