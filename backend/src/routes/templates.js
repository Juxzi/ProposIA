const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM templates ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, description, sections, variables } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO templates (title, description, sections, variables) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, sections, variables]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM templates WHERE id=$1', [req.params.id]);
    if (!rows.length) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, description, sections, variables } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE templates SET title=$1, description=$2, sections=$3, variables=$4 WHERE id=$5 RETURNING *',
      [title, description, sections, variables, req.params.id]
    );
    if (!rows.length) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM templates WHERE id=$1', [req.params.id]);
    if (!rowCount) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
