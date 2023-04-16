//import modules, models and others
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const hbs = require('hbs');
const cors = require('cors');
const { sequelize } = require('./models/DB');
//import models
const User  = require('./models/users');
const Brand  = require('./models/brands');
const Product = require('./models/products');
const Payment = require('./models/payments');
const Order = require('./models/orders');
const OrderItem = require('./models/orderItems');
const Inventory = require('./models/inventory');
const Category = require('./models/categories');
const Cart = require('./models/carts');
const CartItem = require('./models/cartItems');
require('./models/DB');

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

//importing routers
const homeRouter = require('./routers/homeRouter')
const usersRouter = require('./routers/usersRouter');
const productsRouter = require('./routers/productsRouter');
const brandsRouter = require('./routers/brandsRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const cartRouter = require('./routers/cartRouter');
const inventoryRouter = require('./routers/inventoryRouter');
const paymentsRouter = require('./routers/paymentsRouter');
const ordersRouter = require('./routers/ordersRouter');
const authRouter = require('./routers/authRouter');

//setting up the server
const app = express();
const port = 3000;

//configure session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
  
//configure passport middleware
app.use(passport.initialize());
app.use(passport.session());
  
//configure Passport
require('./config/passport-config')(passport);

//enable CORS for all routes
app.use(cors());
//middleware for logging out request info
app.use(morgan('tiny'));
//configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//parse json
app.use(express.json());
//serve html, css, img
app.use(express.static(path.join(__dirname, 'views', 'public')));

//set the MIME type for JavaScript files
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
      res.type('text/javascript');
    }
    next();
  });

//set view engine
app.set('view engine', 'hbs');
// Register the partials directory
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// configure routes
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/orders', ordersRouter);

//connect to database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');

    //sync with db tables
    sequelize.sync()
      .then(() => {
        console.log('Database and table synced successfully!');
        //start server
        app.listen(port, () => {
          console.log(`Server is listening on port ${port}...`);
        });
      })
      .catch(err => {
        console.error('Error syncing database and table:', err);
      });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

