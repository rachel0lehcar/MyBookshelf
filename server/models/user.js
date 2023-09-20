const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  googleId: String,
  // profilePicLink: String,
  username: String,
  //books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bookSchema' }],
  goal: {
    numberOfBooks: Number,
    year: Number,
    currentNOB: Number
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