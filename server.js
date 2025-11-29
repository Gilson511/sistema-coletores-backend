// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Log simples de todas as requisições (opcional)
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// Rotas principais
app.use("/api/coletores", require("./routes/coletores"));
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/basecoletores", require("./routes/basecoletores"));
app.use("/api/colaboradores", require("./routes/colaboradores"));
app.use("/api/coletores_devolvidos", require("./routes/coletoresDevolvidos"));

// Rota raiz para teste
app.get("/", (req, res) => {
  res.send("✅ API está online e funcionando!");
});

// Inicialização do servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor rodando em http://0.0.0.0:${PORT}`);
});


