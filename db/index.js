const { Pool } = require("pg");
const {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGDATABASE,
  PGPORT,
} = require("../constants");

const devConfig = {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGDATABASE,
  PGPORT,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addon
};

const pool = new Pool(
  process.env.NODE_ENV === "procution" ? proConfig : devConfig
);

module.exports = pool;

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
