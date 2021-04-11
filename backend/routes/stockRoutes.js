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

router.route('/:symbol').get(isLoggedIn, getStockData);

module.exports = router;
