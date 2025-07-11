const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, username, created_at FROM users ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, username, created_at FROM users WHERE id=$1', [req.params.id]);
    if (!rows.length) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { username, password } = req.body;
  try {
    let query = 'UPDATE users SET username=$1';
    const params = [username, req.params.id];
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      query = 'UPDATE users SET username=$1, password=$2 WHERE id=$3 RETURNING id, username, created_at';
      params.splice(1, 0, hashed);
    } else {
      query += ' WHERE id=$2 RETURNING id, username, created_at';
    }
    const { rows } = await pool.query(query, params);
    if (!rows.length) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    if (!rowCount) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
