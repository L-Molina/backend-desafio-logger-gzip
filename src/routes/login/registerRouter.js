const { Router } = require("express");
const register = Router();

const Contenedor = require("../../controller/register.controller")

register.get("/", (req, res) => {  
  res.render('register'); 
});

register.post("/", (req, res) => {
  const {username, password, email} = req.body 
  Contenedor.save({username, password, email}) 
  .then (user => {
    if (user) {      
      return res.render('success')      
    } else {
      res.render('error', {error: 'Usuario ya registrado', url: 'register' }) 
    }      
  })
});

module.exports = register;