const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "coletores_db",
  password: "2525",
  port: 5432,
});

module.exports = pool;
