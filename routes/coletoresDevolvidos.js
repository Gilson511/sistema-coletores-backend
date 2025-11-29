const express = require("express");
const router = express.Router();
const db = require("../database");

console.log("✅ Arquivo coletoresDevolvidos.js carregado!");

// POST - salvar coletor devolvido
router.post("/", async (req, res) => {
  const {
    re,
    nome,
    numero_coletor,
    encarregado,
    turno,
    setor,
    data_retirada,
    data_baixa,
    observacoes
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO coletores_devolvidos 
       (re, nome, numero_coletor, encarregado, turno, setor, data_retirada, data_baixa, observacoes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [re, nome, numero_coletor, encarregado, turno, setor, data_retirada, data_baixa, observacoes]
    );

    res.status(201).json({
      message: "✅ Coletor devolvido salvo com sucesso!",
      data: result.rows[0]
    });
  } catch (error) {
    console.error("❌ Erro ao inserir coletor devolvido:", error.message);
    res.status(500).json({ error: "Erro ao salvar coletor devolvido." });
  }
});

// GET - listar todos os coletores devolvidos
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM coletores_devolvidos ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Erro ao buscar coletores devolvidos:", error.message);
    res.status(500).json({ error: "Erro ao buscar coletores devolvidos." });
  }
});

module.exports = router;
