const express = require('express');
const pool = require('./db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const templateRoutes = require('./routes/templates');
const documentRoutes = require('./routes/documents');

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.json({ serverTime: rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/templates', templateRoutes);
app.use('/documents', documentRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
