const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware/isLoggedIn');
const {
  createTransaction,
  getPortifolio,
  updateTransaction,
  deleteTransaction,
  getTransaction,
} = require('../controllers/stockControllers');

router
  .route('/')
  .post(isLoggedIn, createTransaction)
  .get(isLoggedIn, getPortifolio);

router
  .route('/:transactionId')
  .put(isLoggedIn, updateTransaction)
  .delete(isLoggedIn, deleteTransaction)
  .get(isLoggedIn, getTransaction);

module.exports = router;
