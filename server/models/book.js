const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  // imageLink: String,
  userGoogleId: String,
  title: String,
  authors: String,
  genres: [String],
  //reRead: Boolean,
  //timesRead: Number, // if >1, reread = true
  timeIntervals: [{
    startMonth: String, 
    startYear: Number,
    finishMonth: String,
    FinishYear: Number
  }],
  summary: String,
  notes: String,
  rating: Number,
  includeOnShelf: Boolean,
  collections: [{ 
    _id : false,
    collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'collectionSchema' },
    name: String
  }],
  //collectionNames: [{type: String}]
});

module.exports = mongoose.model("Book", bookSchema);