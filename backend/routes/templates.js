const express = require('express');
const { Template } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: 'Creation failed' });
  }
});

router.get('/', async (req, res) => {
  const templates = await Template.findAll();
  res.json(templates);
});

router.get('/:id', async (req, res) => {
  const template = await Template.findByPk(req.params.id);
  if (!template) return res.status(404).end();
  res.json(template);
});

router.put('/:id', async (req, res) => {
  const template = await Template.findByPk(req.params.id);
  if (!template) return res.status(404).end();
  await template.update(req.body);
  res.json(template);
});

router.delete('/:id', async (req, res) => {
  const template = await Template.findByPk(req.params.id);
  if (!template) return res.status(404).end();
  await template.destroy();
  res.status(204).end();
});

module.exports = router;
