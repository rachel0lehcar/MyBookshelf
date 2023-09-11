const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const collectionSchema = new mongoose.Schema({
  name: {type: String, required: true},
  createdAt: {type: Date, required: true},
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bookSchema' }]
});

const bookSchema = new mongoose.Schema({
  // imageLink: String,
  title: String,
  author: String,
  genres: [String],
  reRead: Boolean,
  timesRead: Number, // if >1, reread = true
  started: [{
    month: String, 
    year: Number
  }],
  finished: [{
    month: String, 
    year: Number
  }],
  summary: String,
  notes: String,
  rating: Number,
  includeOnShelf: Boolean,
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'collectionSchema' }]
});

const userSchema = new mongoose.Schema({
  googleId: String,
  // profilePicLink: String,
  username: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bookSchema' }],
  goal: {
    numberOfBooks: Number,
    year: Number
  },
  previousGoals: [{
    numberOfBooks: Number,
    year: Number,
    achieved: Boolean
  }],
  theme: String
});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);