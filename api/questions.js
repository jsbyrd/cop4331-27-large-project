const questionsRouter = require("express").Router();
require("dotenv").config();

var ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

///////////////////
// API Endpoints //
///////////////////

// Search
// Incoming: term, id (both are optional, but term must be inputted)
// Outgoing: result, error
questionsRouter.post("/search", async (req, res) => {
  let error = 200;
  
  const {term, id} = req.body;
  
  console.log("Begin Search for Question with ID " + id);
  
  // more silly nodejs jargain
  var search = {
  $and: [{QuizId:id}],
  $or: [{
    Question: { $regex: term, $options: "i"},
    Answer: { $regex: term, $options: "i"}
    }]
  };

  // projections can be used to specify what to return
  var projection = {
    projection: {QuizId: 0}
  }
  
  try
  {
    const db = client.db("LargeProject");
    const result = await db.collection('Questions').find(search, projection).toArray();
    
    if (result.length > 0)
    {
    var ret = {result:result, error:error};
    }
    else
    {
    error = 204;
    }
    
    var ret = {result:result, error:error};
  }
  catch(e)
  {
    error = e.toString();
    var ret = {error:e.message};
  }
  
  res.status(200).json(ret);
});

// Add
// Incoming: question, answer, wrongAnswers (default: 0), quizId
// Outgoing: id, error
questionsRouter.post("/add", async (req, res) => {
  let error = 200;
  
  const {question, answer, wrongAnswers, quizId} = req.body;
  
  const newQuestion = {Question:question, Answer:answer, WrongAnswers:wrongAnswers, QuizId:quizId};
  
  console.log("Begin ADD for Question with quizId " + quizId);
  
  try
  {
    const db = client.db("LargeProject");
    const result = await db.collection('Questions').insertOne(newQuestion);
    
    var ret = {id:result.insertedId, error: error};
  }
  catch(e)
  {
    error = e.toString();
    var ret = {error:e.message};
  }
  
  res.status(200).json(ret);
});

questionsRouter.post("/edit", async (req, res) => {
  
});

module.exports = questionsRouter;