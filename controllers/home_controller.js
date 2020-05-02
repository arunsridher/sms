//if user is authenticated redirect to home page otherwise sign in page
module.exports.home = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("home", {
      title: "Auth-Sys | Home",
    });
  }
  return res.render("user_sign_in", {
    title: "Auth-Sys | SignIn",
  });
};
