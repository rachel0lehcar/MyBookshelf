const { default: mongoose } = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./models/user.js');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

// env variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback", // redirection after successful authentication
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id , username: profile.displayName}, function (err, user) {
      //return done(err, user);
      return done(err, profile);
    });
    //return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null,  user);
});

passport.deserializeUser(function(user, done) {
  done(null,  user);
});