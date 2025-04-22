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
    res.status(500).json({ error: 'Erro ao adicionar coletor' });
  }
});

module.exports = router;
