const express = require("express");
//the same as import express from 'express'

const server = express();

server.get("/", (req, res) => {
  res.send("Hello Web 17");
});

server.get("/now", (req, res) => {
  res.send(Date(Date.now()).toString());
});

server.listen(4000, () => {
  console.log("\n** API up and running on port 4k **");
});
