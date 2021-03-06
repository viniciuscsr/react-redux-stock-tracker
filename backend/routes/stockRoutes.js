const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware/isLoggedIn');
const {
  createTransaction,
  getPortifolio,
  updateTransaction,
  deleteTransaction,
  getTransaction,
  getStockData,
  getTopHeadlines,
  getMarketSummary,
  getSymbolHeadlines,
} = require('../controllers/stockControllers');

router
  .route('/')
  .post(isLoggedIn, createTransaction)
  .get(isLoggedIn, getPortifolio);

router
  .route('/transactions/:transactionId')
  .put(isLoggedIn, updateTransaction)
  .delete(isLoggedIn, deleteTransaction)
  .get(isLoggedIn, getTransaction);

router.route('/top-headlines').get(getTopHeadlines);
router.route('/market-summary').get(getMarketSummary);

router.route('/:symbol').get(isLoggedIn, getStockData);
router.route('/:symbol/symbol-headlines').get(getSymbolHeadlines);

module.exports = router;
