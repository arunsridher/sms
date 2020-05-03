//include passport and passport local library
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        //if error
        if (err) {
          console.log("Error in finding user");
          return done(err);
        }

        //if user not found or password doesnt match
        if (!user || !user.validPassword(password)) {
          console.log("Inavlid username/password");
          return done(null, false);
        }

        //if user found
        if (user) {
          console.log("User valid and password matches");
          return done(null, user);
        }
      });
    }
  )
);

//serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding the user");
      return done(err);
    }
    return done(null, user);
  });
});

//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

//set authenticated user in response locals object
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
