  const express = require("express");
  const router = express.Router();
  const db = require("../database");
  const jwt = require("jsonwebtoken");

  const SEGREDO = "meu_token_supersecreto"; // Troque por algo mais forte em produção

  // Middleware para autenticar e verificar o tipo
  function autenticar(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Token não enviado" });

    const token = auth.split(" ")[1];
    try {
      const usuario = jwt.verify(token, SEGREDO);
      req.usuario = usuario;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Token inválido" });
    }
  }

  // ✅ ROTA DE CADASTRO – Somente ADMIN pode usar
  router.post("/", autenticar, async (req, res) => {
    if (req.usuario.tipo !== "admin") {
      return res.status(403).json({ error: "Apenas administradores podem cadastrar usuários" });
    }

    const { usuario, senha, tipo } = req.body; // tipo pode ser 'comum' ou 'admin'

    try {
      const existe = await db.query("SELECT * FROM usuarios WHERE usuario = $1", [usuario]);
      if (existe.rows.length > 0) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      await db.query("INSERT INTO usuarios (usuario, senha, tipo) VALUES ($1, $2, $3)", [usuario, senha, tipo || 'comum']);
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
  });

  // ✅ ROTA DE LOGIN
  router.post("/login", async (req, res) => {
    const { usuario, senha } = req.body;

    try {
      const resultado = await db.query("SELECT * FROM usuarios WHERE usuario = $1 AND senha = $2", [usuario, senha]);

      if (resultado.rows.length === 0) {
        return res.status(401).json({ error: "Usuário ou senha inválidos" });
      }

      const usuarioEncontrado = resultado.rows[0];

      const token = jwt.sign(
        {
          id: usuarioEncontrado.id,
          usuario: usuarioEncontrado.usuario,
          tipo: usuarioEncontrado.tipo // ← ESSENCIAL
        },
        SEGREDO,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login bem-sucedido",
        usuario: usuarioEncontrado.usuario,
        tipo: usuarioEncontrado.tipo,
        token
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  });

  module.exports = router;
