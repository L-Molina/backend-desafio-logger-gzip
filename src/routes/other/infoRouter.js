const express = require("express");
const { Router } = require("express");
const info = Router();

const data = {
  Argumentos: process.argv.slice(2),
  Nombre_de_Plataforma: process.platform,
  Version_Node: process.version,
  Path_de_Ejecucion: process.execPath,
  Process_id: process.pid,  
  Carpet_de_Proyecto: process.cwd(),  
}

info.get("/", (req, res) => { 
  res.status(200).send(data); 
});

module.exports = info;