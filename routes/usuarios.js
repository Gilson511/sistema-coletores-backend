const express = require("express");
const router = express.Router();
const db = require("../database");

// ROTA DE CADASTRO
router.post("/", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const existe = await db.query("SELECT * FROM usuarios WHERE usuario = $1", [usuario]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    await db.query("INSERT INTO usuarios (usuario, senha) VALUES ($1, $2)", [usuario, senha]);
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

// ROTA DE LOGIN
router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const resultado = await db.query("SELECT * FROM usuarios WHERE usuario = $1 AND senha = $2", [usuario, senha]);

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    res.json({ message: "Login bem-sucedido", usuario: resultado.rows[0].usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

module.exports = router;

