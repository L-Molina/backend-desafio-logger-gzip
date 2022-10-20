const express = require("express");
const { Router } = require("express");
const randoms = Router();
const { fork } = require("child_process");

randoms.get("/", function (req, res) {
  const child = fork("./controller/random.controller.js");
  const cant = req.query.cant;
  if (isNaN(cant)) {
    let x = 100000000 
    child.send(['start', x]);  
    child.on("message", (numerosRandom) => {
      res.send(numerosRandom);
    });
  } else {
    child.send(['start', cant]);  
    child.on("message", (numerosRandom) => {
      res.send(numerosRandom);
    });
  }
});

module.exports = randoms;