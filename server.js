const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Importa as rotas
const coletoresRoutes = require("./routes/coletores");
const usuariosRoutes = require("./routes/usuarios");

// Usa as rotas
app.use("/api/coletores", coletoresRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
