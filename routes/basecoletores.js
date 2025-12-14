const express = require("express");
const router = express.Router();
const db = require("../database");
const autenticarToken = require("../middleware/auth");

// POST público (cadastro)
router.post("/", async (req, res) => {
  const { numero_coletor, marca, sn } = req.body;
  try {
    await db.query(
      "INSERT INTO base_coletores (numero_coletor, marca, sn) VALUES ($1, $2, $3)",
      [numero_coletor, marca, sn]
    );
    res.status(201).json({ message: "Coletor adicionado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar coletor" });
  }
});

// GET - listar base de coletores
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM base_coletores");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao obter base de coletores" });
  }
});

// PUT - editar coletor ✅ (ROTA CORRETA)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { numero_coletor, marca, sn } = req.body;

  try {
    const result = await db.query(
      `
      UPDATE base_coletores
      SET numero_coletor = $1,
          marca = $2,
          sn = $3
      WHERE id = $4
      RETURNING *
      `,
      [numero_coletor, marca, sn, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Coletor não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar coletor" });
  }
});

// POST protegido (opcional)
router.post("/protegido", autenticarToken, async (req, res) => {
  const { numero_coletor, marca, sn } = req.body;
  try {
    await db.query(
      "INSERT INTO base_coletores (numero_coletor, marca, sn) VALUES ($1, $2, $3)",
      [numero_coletor, marca, sn]
    );
    res.status(201).json({ message: "Coletor adicionado com sucesso" });
  } catch (err) {
    res.status(500).json({
      error: "Erro ao adicionar coletor, o mesmo já existe com mesmo SN",
    });
  }
});

// DELETE - remover coletor
router.delete("/:id", autenticarToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM base_coletores WHERE id = $1", [id]);
    res.json({ message: "Coletor removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover coletor" });
  }
});

module.exports = router;
