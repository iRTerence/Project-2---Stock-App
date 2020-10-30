const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Stocks = require('../models/stocks');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },

  function(accessToken, refreshToken, profile, cb) {
    Stocks.findOne({ 'googleId': profile.id }, function(err, stock) {
      if (err) return cb(err);
      if (stock) {
        return cb(null, stock);
      } else {
        var newStocks = new Stocks({
          name: profile.name.givenName,
          googleId: profile.id,
        });
        newStocks.save(function(err) {
          console.log(profile.id)
          if (err) return cb(err);
          return cb(null, newStocks);
        });
      }
    });
  }
));

passport.serializeUser(function(stocks, done) {
  done(null, stocks.id);
  }),

  passport.deserializeUser(function(id, done) {
      Stocks.findById(id, function(err, stocks) {
        done(err, stocks);
      });
    })

  