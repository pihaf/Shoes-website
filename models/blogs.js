const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  port: dbConfig.PORT
});

const Blog = sequelize.define('Blog', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    blog_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });

  module.exports = Blog;