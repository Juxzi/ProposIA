const express = require('express');
const { Document } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const doc = await Document.create({ ...req.body, UserId: req.userId });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Creation failed' });
  }
});

router.get('/', async (req, res) => {
  const docs = await Document.findAll({ where: { UserId: req.userId } });
  res.json(docs);
});

router.get('/:id', async (req, res) => {
  const doc = await Document.findOne({ where: { id: req.params.id, UserId: req.userId } });
  if (!doc) return res.status(404).end();
  res.json(doc);
});

router.put('/:id', async (req, res) => {
  const doc = await Document.findOne({ where: { id: req.params.id, UserId: req.userId } });
  if (!doc) return res.status(404).end();
  await doc.update(req.body);
  res.json(doc);
});

router.delete('/:id', async (req, res) => {
  const doc = await Document.findOne({ where: { id: req.params.id, UserId: req.userId } });
  if (!doc) return res.status(404).end();
  await doc.destroy();
  res.status(204).end();
});

module.exports = router;
