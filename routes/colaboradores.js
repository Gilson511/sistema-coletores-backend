const express = require('express');
const router = express.Router();
const pool = require('../database'); // conexão com PostgreSQL

// Criar colaborador
router.post('/', async (req, res) => {
  const { matricula, nome_completo, turno, setor, encarregado } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO colaboradores (matricula, nome_completo, turno, setor, encarregado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [matricula, nome_completo, turno, setor, encarregado]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar colaborador" });
  }
});

// Listar colaboradores (opcional)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM colaboradores ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar colaboradores" });
  }
});

module.exports = router;
