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

app.post('/getbook', async(req,res) => { // single book (maybe have this be to get all books too? or different route)
  const book = await Book.findOne({_id: req.body.bookid});
  console.log(book.title);
  res.json(book);
});

app.post('/getallbooks', async(req,res) => {
  // ADD CONDITIONS DEPENDING ON SEARCH PARAMETERS (ex. Null collection or by title)
  const collectionName = req.body.collectionName;
  let parameters = {};
  if(collectionName)
    parameters = {name: collectionName};

  const myCollection = await Collection.findOne(parameters);
  const myBooks = await Book.find({_id : {$in: myCollection.books}});
  
  if(collectionName)
    console.log("found books from '" + collectionName + "' collection");
  res.json(myBooks);
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


app.post('/savetocollections', async(req,res) => {
  const objectid = req.body.objectid; // objectid of book
  const collections = req.body.collections; // collections to add this book to
  const updatedCols = [];
  //const collectionNames = [];

  // add book to the checked collections
  await Promise.all(collections.map(async(collection) => {
    const found = await Collection.findOneAndUpdate( 
      { name: collection}, 
      { $addToSet : { books: objectid }
    }).then(console.log("pushed to " + collection));
    if(found) {
      updatedCols.push({name: found.name, collectionId: found._id});
      //collectionNames.push(found.name);
    }
  }));
  // remove book from unchecked collections
  Collection.updateMany(
    { name:   { $nin: collections } },
    { $pull : { books: objectid } }
  ).then(console.log("pulled collections not in [" + collections + "]"));

  Book.updateOne( // add new collectionIds to book
    { _id: objectid },
    { $set: { 'collections': updatedCols } }
    /*{ $pull: { 'collections': { $nin: updatedCols} } },
    { $addToSet: {'collections':{ $each: updatedCols} } }*/
  ).then(console.log("updated book collection list"));

  const book = await Book.findById(objectid);
  console.log(book.title + " " + book.collections);

  res.json('Updated Collections!');
})

app.listen(5000, () => console.log('listening on: 5000'));