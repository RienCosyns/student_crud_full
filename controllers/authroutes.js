var express = require("express");
var router = express.Router();
var User = require("../models/users");
var { check, validationResult } = require("express-validator/check");
// var {check: check, validationResult: validationResult}
var passport = require("passport");

router.get("/", (req, res) => {
  res.render("auth");
});

router.get("/signup", (req, res) => {
  res.render("signup", { errors: null });
});

router.post(
  "/signup",
  [
    check("username", "Username can't be empty").isLength({ min: 1 }),
    check(
      "password",
      "Password has to be at least 5 characters and needs to have at least one digit"
    )
      .isLength({ min: 5 })
      .matches(/\d/),
    check("password2", "Passwords are not the same").custom(
      (value, { req }) => value === req.body.password
    )
  ],
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.mapped() });
      //return res.json(errors.mapped());
    } else {
      // res.json(req.body);
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return next(err);
        if (user) {
          req.flash("error", "Username is already taken");
          return res.redirect("/auth/signup");
        }
        var newUser = new User({
          username: req.body.username,
          password: req.body.password
        });
        newUser.save(err => {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash("success", "You're now signed up");
            res.redirect("/students");
          }
        });
      });
    }
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("login", {
    successRedirect: "/students",
    failureRedirect: "/auth",
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logout();
  req.flash("success", "You've been logged out");
  res.redirect("/");
});

module.exports = router;
