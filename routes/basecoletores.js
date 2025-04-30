const autenticarToken = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const db = require('../database');

// GET - listar base de coletores
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM base_coletores');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter base de coletores' });
  }
});

// POST - adicionar coletor
router.post('/', async (req, res) => {
  const { numero_coletor, marca, sn } = req.body;
  try {
    await db.query(
      'INSERT INTO base_coletores (numero_coletor, marca, sn) VALUES ($1, $2, $3)',
      [numero_coletor, marca, sn]
    );
    res.status(201).json({ message: 'Coletor adicionado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar coletor, o mesmo ja existe com mesmo sn' });
  }
});

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
