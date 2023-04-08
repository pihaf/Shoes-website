//import models
const User = require('./users')
const Brand = require('./brands')
const Product = require('./products')
const Payment = require('./payments')
const Order = require('./orders')
const OrderItem = require('./orderItems')
const Inventory = require('./inventory')
const Category = require('./categories')
const Cart = require('./carts')
const CartItem = require('./cartItems')

//import sequelize and env config
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

//initialize 
const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  port: dbConfig.PORT
});

//connect to db
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database!');
  })
  .catch((err) => {
    console.error('Error connecting to MySQL database:', err);
  });

//define relationships between models
Brand.hasMany(Product, { foreignKey: 'brand_id' });
Product.belongsTo(Brand, { foreignKey: 'brand_id' });

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id'});
OrderItem.belongsTo(Order, { foreignKey: 'order_id'});

Product.hasMany(OrderItem, { foreignKey: 'product_id'});
OrderItem.belongsTo(Product, { foreignKey: 'product_id'});

Product.hasMany(Inventory, { foreignKey: 'product_id'});
Inventory.belongsTo(Product, { foreignKey: 'product_id'});

User.hasOne(Cart, { foreignKey: 'user_id'});
Cart.belongsTo(User, { foreignKey: 'user_id'});

Cart.hasMany(CartItem, { foreignKey: 'cart_id'});
CartItem.belongsTo(Cart, { foreignKey: 'cart_id'});

Product.hasMany(CartItem, { foreignKey: 'product_id'});
CartItem.belongsTo(Product, { foreignKey: 'product_id'});

Order.hasMany(Payment, { foreignKey: 'order_id'});
Payment.belongsTo(Order, { foreignKey: 'order_id'});


//sync with db tables
sequelize.sync()
  .then(() => {
    console.log('Database and table synced successfully!');
  })
  .catch((err) => {
    console.log('Error creating database and table:', err);
  });