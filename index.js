const express = require("express");
//the same as import express from 'express'

const db = require("./data/db.js");

const server = express();

server.use(express.json()); //makes post and put work

server.get("/", (req, res) => {
  res.send("Hello Web 17");
});

server.get("/now", (req, res) => {
  res.send(Date(Date.now()).toString());
});

//Create
server.post("/hubs", (req, res) => {
  //read data for hub
  const hubInfo = req.body;
  //add the hub to db
  db.hubs
    .add(hubInfo)
    //tell client what happened
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      res.status(500).json({ message: "error creating hub" });
    });
});

//Read
server.get("/hubs", (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      //handle error
      res.status(500).json({ message: "error retrieving hubs" });
    });
});

//Update
server.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.hubs
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Hub not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error updating hub" });
    });
});

//Delete
server.delete("/hubs/:id", (req, res) => {
  const id = req.params.id;

  db.hubs
    .remove(id)
    .then(deleted => {
      res.status(204).end(); //end tells client that request is finished.
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting hubs" });
    });
});

server.listen(4000, () => {
  console.log("\n** API up and running on port 4k **");
});
