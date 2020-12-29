const asyncHandler = require('express-async-handler');
const pool = require('../config/db');

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

module.exports = { createTransaction };
