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
  connectionString: process.env.DATABASE_URL, //heroku addon für Datenbank auf Heroku
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
