const User = require("../models/user");

//render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("home");
  }
  return res.render("user_sign_up", {
    title: "SMS | SignUp",
    captcha: res.recaptcha,
  });
};

//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("home", {
      title: "SMS | Home",
    });
  }
  return res.render("user_sign_in", {
    title: "SMS | SignIn",
  });
};

//create a new user account
module.exports.createAccount = async function (req, res) {
  // console.log(req.body);
  try {
    //if passwords dont match
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    let user = await User.findOne({ email: req.body.email });
    //if user already exists
    if (user) {
      console.log("user already exists");
      return res.redirect("back");
    } else {
      //create a new user
      user = new User();
      user.email = req.body.email;
      user.name = req.body.name;
      //set password as encrypted hash
      user.setPassword(req.body.password);
      await user.save();
      return res.redirect("/users/sign-in");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

//create a news session when user signs in through passport
module.exports.createSession = function (req, res) {
  res.redirect("/");
};

//destroy session when user signs out
module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/users/sign-in");
};

//render home page
module.exports.home = function (req, res) {
  return res.render("home", {
    title: "SMS | Home",
  });
};
