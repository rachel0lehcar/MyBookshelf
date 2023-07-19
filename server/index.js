const express = require('express');
const session = require('express-session');
const passport = require('passport');
//const mongoose = require('mongoose');
require('dotenv').config();
require('./auth');


const app = express();
app.use(session({ secret: process.env.SESSION_SECRET })); // env variable
app.use(passport.initialize());
app.use(passport.session());

//const uri = process.env.MONGO_URI;

/*-----AUTHENTICATION-----*/

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401); // if request has a user already (else give 401)
}

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
)

app.get('/auth/failure', (req, res) => {
  res.send('something went wrong...')
});

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}!`);
});

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if(err) { return next(err);}
    // req.session.destroy();
    //res.sendStatus('Goodbye!');
    res.redirect('/');
  }); // asynch
});

/*---------------------------*/

app.listen(5000, () => console.log('listening on: 5000'));