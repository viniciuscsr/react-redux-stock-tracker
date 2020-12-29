const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const pool = require('../config/db');

const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const foundUser = await pool.query(
        'SELECT id, name, email FROM users WHERE id=$1',
        [decoded.id]
      );

      req.user = foundUser.rows[0];

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { isLoggedIn };
