const cookiesRouter = require("express").Router();

var ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

cookiesRouter.post("/clear", async (req, res) => {
  res.clearCookie();
});

module.exports = cookiesRouter;