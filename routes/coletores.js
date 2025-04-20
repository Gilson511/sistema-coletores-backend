const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", async (req, res) => {
  const {
    re,
    numero_coletor,
    encarregado,
    turno,
    setor,
    hora_pegou,
    hora_baixa,
    estado
  } = req.body;

  try {
    await db.query(
      `INSERT INTO coletores 
      (re, numero_coletor, encarregado, turno, setor, hora_pegou, hora_baixa, estado) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [re, numero_coletor, encarregado, turno, setor, hora_pegou, hora_baixa, estado]
    );

    res.status(201).json({ message: "Coletor cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar coletor." });
  }
});

module.exports = router;
