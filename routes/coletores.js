// routes/coletores.js
const express = require("express");
const router = express.Router();
const db = require("../database");

console.log("✅ Arquivo coletores.js carregado!");

// Middleware global de log para todas as requisições deste router
router.use((req, res, next) => {
  console.log(`🛰️ [COLETORES] ${req.method} ${req.originalUrl}`);
  next();
});

// 🔧 ROTA DE TESTE
router.get("/teste-delete", (req, res) => {
  res.send("🔧 Rota de teste acessada com sucesso");
});

// CREATE - cadastrar coletor
router.post("/", async (req, res) => {
  let {
    re,
    numero_coletor,
    encarregado,
    turno,
    setor,
    hora_pegou,
    hora_baixa,
    estado
  } = req.body;

  // Normaliza hora_baixa vazia -> null
  hora_baixa = hora_baixa && hora_baixa.trim() !== "" ? hora_baixa : null;

  console.log("📦 Dados recebidos:", req.body);

  try {
    await db.query(
      `INSERT INTO coletores 
      (re, numero_coletor, encarregado, turno, setor, hora_pegou, hora_baixa, estado) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [re, numero_coletor, encarregado, turno, setor, hora_pegou, hora_baixa, estado]
    );

    console.log("✅ Coletor salvo com sucesso!");
    res.status(201).json({ message: "Coletor cadastrado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO CADASTRAR:", err.message);
    res.status(500).json({ error: "Erro ao cadastrar coletor." });
  }
});

// READ - listar todos
router.get("/", async (req, res) => {
  try {
    const resultado = await db.query("SELECT * FROM coletores ORDER BY id DESC");
    res.json(resultado.rows);
  } catch (err) {
    console.error("❌ Erro ao buscar coletores:", err.message);
    res.status(500).json({ error: "Erro ao buscar coletores" });
  }
});

// DELETE - excluir por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM coletores WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Coletor não encontrado." });
    }

    res.json({ message: "Coletor excluído com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao excluir coletor:", err.message);
    res.status(500).json({ error: "Erro ao excluir coletor." });
  }
});

// UPDATE - atualizar por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
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
      `UPDATE coletores SET 
        re = $1,
        numero_coletor = $2,
        encarregado = $3,
        turno = $4,
        setor = $5,
        hora_pegou = $6,
        hora_baixa = $7,
        estado = $8
       WHERE id = $9`,
      [re, numero_coletor, encarregado, turno, setor, hora_pegou, hora_baixa, estado, id]
    );

    res.json({ message: "Coletor atualizado com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao atualizar coletor:", err.message);
    res.status(500).json({ error: "Erro ao atualizar coletor." });
  }
});



module.exports = router;
