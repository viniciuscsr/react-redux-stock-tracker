const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://node_user:node_password@localhost:5432/react_redux_stock_tracker',
  ssl: false,
});

module.exports = pool;
