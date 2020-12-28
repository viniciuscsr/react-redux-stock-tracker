const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateToken');
const pool = require('../config/db');
const bcrypt = require('bcrypt');

//@desc Auth user & get token
//@route POST /api/users/login
//@access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query('SELECT * FROM users WHERE email =$1', [email]);

  const match = await bcrypt.compare(password, user.rows[0].password);

  if (user.rows && match) {
    res.json({
      _id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      token: generateToken(user.rows[0].id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

//@desc Register a new user
//@route POST /api/users
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  if (userExists.rows[0]) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2 , $3) RETURNING id, name, email`,
    [name, email, hashedPassword]
  );

  if (user) {
    res.status(201).json({
      _id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      token: generateToken(user.rows[0].id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

module.exports = { authUser, registerUser };
