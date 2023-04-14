//import modules, models and others
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const { User } = require('./models/users');
require('./models/DB');

//importing routers
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
  
//configure passport serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
});
  
// configure routes
app.use('/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/orders', ordersRouter);

//middleware for logging out request info
app.use(morgan('tiny'));
//parse form data
app.use(express.urlencoded({extended : false}));
//parse json
app.use(express.json());
//serve html, css, img
app.use(express.static(path.join(__dirname, 'views', 'public')));

//get request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.send('<h1>About page<\h1>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact page<\h1>');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});

