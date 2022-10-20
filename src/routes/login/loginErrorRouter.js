const { Router } = require("express");
const loginError = Router();

loginError.get("/", (req, res) => {  
  res.render('error', {error: 'Usuario o contraseña incorrectos', url: 'login'}) 
});

module.exports = loginError;