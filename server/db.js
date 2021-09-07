const Pool = require("pg").Pool;
require("dotenv").config();
console.log(process.env.PASSWORD);
const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  host: process.env.Host,
  database: process.env.DATABASE,
});

module.exports = pool;
