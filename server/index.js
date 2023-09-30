const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const passport = require('passport');
//const mongoose = require('mongoose');
//const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
require('./auth');
const Book = require('./models/book.js');
const Collection = require('./models/collection.js');


const app = express();
//mongoose.connect(process.env.MONGO_URI);

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
app.use(bodyParser.json());

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

app.get('/user', (req,res) => {
  res.send(req.user); // sent user object to frontend
});

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if(err) { return next(err);}
    // req.session.destroy();
    //res.sendStatus('Goodbye!');
    res.redirect('/');
  }); // asynch
});

/*-----------GOOGLE-BOOKS-----------*/

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

/*------------DATABASE------------*/

app.post('/createnewbook', (req,res) => {
  data = req.body;
  console.log(data);
  const book = new Book({
    userGoogleId: req.user.id,
		title: data.title,
    authors: data.authors,
    genres: data.genres,
    //reRead: Boolean,
    //timesRead: Number, // if >1, reread = true
    timeIntervals: [{
      startMonth: data.startMonth,
      startYear: null,
      finishMonth: data.finishMonth,
      FinishYear: null
    }],
    summary: data.description,
    notes: data.notes,
    rating: null,
    includeOnShelf: null
		
	}).save().then(console.log('data has been saved!'))
  .then(res.json(book._id));

});

app.get('/getbook', async(req,res) => { // single book (maybe have this be to get all books too? or different route)
  const objectid = req.body.objectid;
  const book = await Book.find({_id: objectid})
  res.json(book);
});

app.get('/getcollections', async(req,res) => {
  const data = await Collection.find().then(console.log("data collected!"));
  //console.log(data);
  res.json(data);
});


app.post('/newcollection', async(req,res) => {
  const newList = req.body.newList;
  console.log(newList);

  const count = await Collection.find({name:newList}).count();
  console.log(count);
  if(count != 0) {
    console.log("Already a List");
    res.json("Already a List");
  }
  else {
    console.log("new collection");
    new Collection({
      googleId: process.env.TEST_GOOGLE_ID,
      name: newList
    }).save().then(res.json("data saved!"))
  }
});


/*app.post('/savetocollections', (req,res) => {
  const objectid = req.body.objectid;
  
})*/

app.listen(5000, () => console.log('listening on: 5000'));