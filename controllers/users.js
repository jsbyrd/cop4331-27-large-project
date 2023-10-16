const usersRouter = require("express").Router();
require("dotenv").config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

usersRouter.get("/", async (req, res) => {
  let error = "N/A";
  let _ret = [];
  try {
    console.log(url);
    const db = client.db("LargeProject");
    const result = await db.collection("Users").find().toArray();
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      _ret.push(result[i]);
    }
  }
  catch(e) {
    error = e.toString();
  }
  let ret = { result: _ret, error: error };
  res.status(200).json(ret);
});

module.exports = usersRouter;