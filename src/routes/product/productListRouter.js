const express = require("express");
const { Router } = require("express");
const productsList = Router();

const Contenedor = require("../../controller/products.controller") 

productsList.get("/", (req, res) => { 
  Contenedor.list()
  .then((data) => {  
    res.status(200).send(data);  
  })
});

module.exports = productsList;