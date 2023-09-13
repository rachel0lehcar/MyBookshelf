const express = require('express');
const session = require('express-session');
const passport = require('passport');
//const mongoose = require('mongoose');
//const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
require('./auth');


const app = express();

//app.use(cors());
app.use(session({ 
  secret: process.env.SESSION_SECRET, // env variable
  resave: true,
  saveUninitialized: true,
  /*cookie: {
    sameSite: 'none',
    secure: 'true'
  }*/
}));
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
  // res.send(`Hello ${req.user.displayName}!`);
  res.redirect(process.env.REACT_HOME_PAGE);
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

app.get('/googlebooks/:book', (req, res) => {
  //console.log('hit');
  const book = req.params.book;
  console.log(book);
  //console.log(req.params);
  axios.get('https://www.googleapis.com/books/v1/volumes?q=' + book + '&key=' + process.env.API_KEY + "&maxResults=40")
    .then(data => {
      //console.log(data.data);
      res.json(data.data.items);
    });
});

app.get('/gbvolume/:bookid', (req, res) => {
  //console.log('hit gbvolume');
  const bookid = req.params.bookid;
  //console.log(bookid);
  axios.get('https://www.googleapis.com/books/v1/volumes/' + bookid + '?key=' + process.env.API_KEY)
    .then(data => {
      //console.log(data.data);
      res.json(data.data);
    });
});

app.listen(5000, () => console.log('listening on: 5000'));