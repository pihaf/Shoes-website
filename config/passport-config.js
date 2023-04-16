const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users');

module.exports = function(passport) {
//configure passport local strategy
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
        } catch (err) {
        return done(err);
        }
  }));

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
};
