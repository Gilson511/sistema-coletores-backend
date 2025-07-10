const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
const coletoresRoutes = require("./routes/coletores");
app.use("/api/coletores", coletoresRoutes);

const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

const baseColetoresRoutes = require("./routes/basecoletores");
app.use("/api/basecoletores", baseColetoresRoutes);

const colaboradoresRoutes = require("./routes/colaboradores");
app.use("/api/colaboradores", colaboradoresRoutes);

// ✅ Inicia o servidor ouvindo em todas as interfaces (acessível por IP local)
app.listen(3000, '0.0.0.0', () => {
  console.log("✅ Servidor rodando em http://0.0.0.0:3000");
});
