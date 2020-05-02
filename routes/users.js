//include express and create a router
const express = require("express");
const router = express.Router();
const env = require("../config/environment");

//passport to authenticate user during login
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.get("/sign-out", usersController.destroySession);
router.get("/home", usersController.home);

router.post("/create", usersController.createAccount);
//use passport as a middleware to authenticate
router.post(
  "/createSession",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

//export router
module.exports = router;
