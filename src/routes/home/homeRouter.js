const { Router } = require("express");
const home = Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User'); 
const Contenedor = require("../../controller/products.controller")

home.get("/", auth, async (req, res) => {
  const datosUsuario = await User.findById(req.user._id); 
  const productos = await Contenedor.list()
  const user = datosUsuario.username; 
  res.render("home", {
    user: user,
    productos: productos,
  });
});

module.exports = home;