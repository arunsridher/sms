//if user is authenticated redirect to home page otherwise sign in page
module.exports.home = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("home", {
      title: "SMS | Home",
    });
  }
  return res.render("user_sign_in", {
    title: "SMS | SignIn",
  });
};
