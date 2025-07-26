const express = require('express');
const router = express.Router();
const pool = require('../database'); // conexão com PostgreSQL

// Criar colaborador
router.post('/', async (req, res) => {
  const { matricula, nome_completo, turno, setor, encarregado } = req.body;

  console.log('recebido', req.body);
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

router.get('/:matricula', async (req, res) => {
  const { matricula } = req.params;
  try {
    const result = await pool.query('SELECT * FROM colaboradores WHERE matricula = $1', [matricula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Colaborador não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar colaborador" });
  }
});

router.put('/:matricula', async (req, res) => {
  const { matricula } = req.params;
  const { nome_completo, turno, setor, encarregado } = req.body;

  try {
    const result = await pool.query(
      'UPDATE colaboradores SET nome_completo = $1, turno = $2, setor = $3, encarregado = $4 WHERE matricula = $5 RETURNING *',
      [nome_completo, turno, setor, encarregado, matricula]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Colaborador não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar colaborador" });
  }
});

router.delete('/:matricula', async (req, res) => {
  const { matricula } = req.params;

  try {
    const result = await pool.query('DELETE FROM colaboradores WHERE matricula = $1 RETURNING *', [matricula]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Colaborador não encontrado" });
    }

    res.status(204).send(); // sucesso, sem conteúdo
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir colaborador" });
  }
});


module.exports = router;
