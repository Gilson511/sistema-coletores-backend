const express = require('express');
const router = express.Router();
const db = require('../database');
const autenticarToken = require('../middleware/auth');

// POST público (sem autenticação) para cadastro.html
router.post('/', async (req, res) => {
  const { numero_coletor, marca, sn } = req.body;
  try {
    await db.query(
      'INSERT INTO base_coletores (numero_coletor, marca, sn) VALUES ($1, $2, $3)',
      [numero_coletor, marca, sn]
    );
    res.status(201).json({ message: 'Coletor adicionado com sucesso (rota pública)' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar coletor' });
  }
});

// GET - listar base de coletores
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM base_coletores');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter base de coletores' });
  }
});

// POST - adicionar coletor (rota protegida)
router.post('/protegido', autenticarToken, async (req, res) => {
  const { numero_coletor, marca, sn } = req.body;
  try {
    await db.query(
      'INSERT INTO base_coletores (numero_coletor, marca, sn) VALUES ($1, $2, $3)',
      [numero_coletor, marca, sn]
    );
    res.status(201).json({ message: 'Coletor adicionado com sucesso (rota protegida)' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar coletor, o mesmo já existe com mesmo sn' });
  }
});

// DELETE - remover coletor
router.delete('/:id', autenticarToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM base_coletores WHERE id = $1', [id]);
    res.json({ message: 'Coletor removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover coletor' });
  }
});

module.exports = router;
