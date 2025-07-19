const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors()); // Ou configure o origin aqui se quiser restringir

app.use(express.json());

const coletoresRoutes = require("./routes/coletores");
app.use("/api/coletores", coletoresRoutes);

const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

const baseColetoresRoutes = require("./routes/basecoletores");
app.use("/api/basecoletores", baseColetoresRoutes);

const colaboradoresRoutes = require("./routes/colaboradores");
app.use("/api/colaboradores", colaboradoresRoutes);

app.get("/", (req, res) => {
  res.send("✅ API está online e funcionando!");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor rodando em http://0.0.0.0:${PORT}`);
});
