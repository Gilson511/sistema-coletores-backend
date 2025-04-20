const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres:MLYDjeOLbzgIYNvEicmzvxBifdvfnTqc@yamabiko.proxy.rlwy.net:52724/railway"

});

module.exports = pool;
