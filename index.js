const express = require("express");
//the same as import express from 'express'

const server = express();

server.listen(4000, () => {
  console.log("\n** API up and running on port 4k **");
});
