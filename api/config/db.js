/*  Wraps mysql2 connection pool so you can `await db.query()` anywhere */
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host            : process.env.MYSQL_HOST,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit   : 10,
  namedPlaceholders : true
});

module.exports = pool;
