const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  port: dbConfig.PORT
});

//define the Cart model
const Cart = sequelize.define('Cart', {
}, {
  timestamps: false,
  createdAt: false,
  updatedAt: false
});

module.exports = Cart