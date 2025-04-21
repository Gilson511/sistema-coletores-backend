const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
const coletoresRoutes = require("./routes/coletores");
console.log("🧩 Carregando rotas de coletores:", coletoresRoutes.stack.map(r => r.route?.path));
app.use("/api/coletores", coletoresRoutes);

const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
