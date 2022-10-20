const { Router } = require("express");
const login = Router();
const auth = require('../../middleware/auth');

const passport = require("../../middleware/passport");

login.get("/", (req, res) => {  
  res.render('login'); 
});

login.post("/", passport.authenticate("local", { failureRedirect: "/loginerror" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = login;