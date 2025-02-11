const Pool = require('pg').Pool;
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
});
pool.connect((err) => {
  if (err) throw err;
  console.log('Connection to db is successfull', process.env, process.env.URL_CLIENT);
});

module.exports = pool;
