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

// Inicia o servidor  
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
