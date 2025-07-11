require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/users');
const templateRoutes = require('./routes/templates');
const documentRoutes = require('./routes/documents');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/templates', authMiddleware, templateRoutes);
app.use('/documents', authMiddleware, documentRoutes);

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
})();
