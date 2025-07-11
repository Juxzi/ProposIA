const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// CRUD operations
router.get('/', auth, async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'username'] });
  res.json(users);
});

router.get('/:id', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: ['id', 'username'] });
  if (!user) return res.status(404).end();
  res.json(user);
});

router.put('/:id', auth, async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).end();
  if (username) user.username = username;
  if (password) user.password = await bcrypt.hash(password, 10);
  await user.save();
  res.json({ id: user.id, username: user.username });
});

router.delete('/:id', auth, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).end();
  await user.destroy();
  res.status(204).end();
});

module.exports = router;
