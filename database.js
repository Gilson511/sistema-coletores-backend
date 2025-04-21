const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",           // seu usuário do PostgreSQL
  host: "localhost",          // rodando localmente
  database: "coletores_db",   // nome do banco que você criou
  password: "2525", // a senha que você criou na instalação
  port: 5432,                 // porta padrão do PostgreSQL
});

module.exports = pool;
