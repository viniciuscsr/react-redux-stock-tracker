const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware/isLoggedIn');
const { createTransaction } = require('../controllers/stockControllers');

router.route('/').post(isLoggedIn, createTransaction);

module.exports = router;
