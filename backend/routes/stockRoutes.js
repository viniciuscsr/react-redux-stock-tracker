const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware/isLoggedIn');
const {
  createTransaction,
  getPortifolio,
} = require('../controllers/stockControllers');

router
  .route('/')
  .post(isLoggedIn, createTransaction)
  .get(isLoggedIn, getPortifolio);

module.exports = router;
