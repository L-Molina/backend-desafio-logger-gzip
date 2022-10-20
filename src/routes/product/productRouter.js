const express = require("express");
const { Router } = require("express");
const products = Router();

const Contenedor = require("../../controller/products.controller")

products.get("/", (req, res) => {
  Contenedor.list() 
  .then((productos) => {      
    res.render('products', {productos}); 
  })    
});

products.post("/", (req, res) => { 
  const {title, price, thumbnail} = req.body 
  Contenedor.save({title, price, thumbnail})  
  const productos = Contenedor.list() 
  res.redirect('/');   
});

module.exports = products;