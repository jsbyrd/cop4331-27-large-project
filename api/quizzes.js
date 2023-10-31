const quizzesRouter = require("express").Router();
require("dotenv").config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

quizzesRouter.post("/get", async (req, res) => {



});

quizzesRouter.post("/add", async (req, res) => {
  


});

quizzesRouter.post("/edit", async (req, res) => {



});

module.exports = quizzesRouter;