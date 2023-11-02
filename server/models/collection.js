const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  userGoogleId: String,
  userEmail: String,
  name: {type: String, required: true},
  //createdAt: {type: Date, required: true},
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bookSchema' }]
});

module.exports = mongoose.model("Collection", collectionSchema);