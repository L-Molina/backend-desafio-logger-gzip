const express = require("express");
const { Router } = require("express");
const randoms = Router();
const numCPUs = require("os").cpus().length;

const PORT = parseInt(process.argv[2]) || 8080;

const random = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

randoms.get("/", function (req, res) {
  console.log(`port: ${PORT} -> Fyh: ${Date.now()}`);
  const randomNum = random();
  const info = {
    puerto: PORT,
    num_random: randomNum,
    procesadores: numCPUs,
  }
  res.send(info);  
});

module.exports = randoms;