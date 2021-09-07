const Pool = require("pg").Pool;
require("dotenv").config();
console.log(process.env.PASSWORD);
const pool = new Pool({
  user: "postgres",
  password: "Linux@root",
  port: 5432,
  host: "localhost",
  database: "searchproject",
});

module.exports = pool;
