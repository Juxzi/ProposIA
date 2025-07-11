const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Template = sequelize.define('Template', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  sections: DataTypes.JSONB,
  variables: DataTypes.JSONB,
});

const Document = sequelize.define('Document', {
  content: DataTypes.JSONB,
});

User.hasMany(Document);
Document.belongsTo(User);
Template.hasMany(Document);
Document.belongsTo(Template);

module.exports = { sequelize, User, Template, Document };
