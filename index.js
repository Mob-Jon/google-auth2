require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const PORT = 3000;
require('./passport-setup');


app.set('view engine', 'ejs');

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(session({secret: 'SECRET', saveUninitialized: true, resave: false}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('pages/index');
})
app.get('/failed', (req, res) => {
    res.send('Log in failed');
})
app.get('/success', isLoggedIn, (req, res) => {
    console.log('USER', req.user);
    res.render('pages/success', req.user)
    // res.send(req.user)
})
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed', successRedirect: '/success' }))

app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session = null
        res.redirect('/');
    });
})
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
})

