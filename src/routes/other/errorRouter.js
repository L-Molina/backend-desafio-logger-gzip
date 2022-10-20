const { Router } = require("express");
const express = require("express");
var url = require('url');

//logger
const logger = require("../../logs/logger");

//router
const error = Router();

error.get("*", (req, res) => {
  const { url, method } = req;      
  logger.warn(`Ruta ${url} Inexistente - con metodo: ${method}`);  
  res.json({ error : -2, descripcion: `ruta inexistente` })
});

error.post("*", (req, res) => {  
  const { url, method } = req;      
  logger.warn(`Ruta ${url} Inexistente - con metodo: ${method}`);  
  res.json({ error : -2, descripcion: `ruta inexistente` })
});

error.delete("*", (req, res) => { 
  const { url, method } = req;      
  logger.warn(`Ruta ${url} Inexistente - con metodo: ${method}`);   
  res.json({ error : -2, descripcion: `ruta inexistente` })
});

error.put("*", (req, res) => {  
  const { url, method } = req;      
  logger.warn(`Ruta ${url} Inexistente - con metodo: ${method}`);  
  res.json({ error : -2, descripcion: `ruta inexistente` })
});

module.exports = error;