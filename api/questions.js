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
// Incoming: term (optional but needs to be inputted), quizId (required or it will return empty)
// Outgoing: result, error
questionsRouter.post("/search", async (req, res) => {
  let error = 200;
  
  const {term, quizId} = req.body;
  
  console.log("Begin Search for Question with Quiz ID " + quizId);
  
  // more silly nodejs jargain
  var search = {
    $and: [{QuizId:quizId}],
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
    
    if (result.length == 0)
      error = 204;
    
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
// Incoming: question, answer, wrongAnswers, quizId
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

// Edit
// Incoming: id (required), question, answer, wrongAnswers, quizId (optional; only input what's edited)
// Outgoing: error
questionsRouter.post("/edit", async (req, res) => {
  let error = 200;

  const {id, question, answer, wrongAnswers, quizId} = req.body;

  // some annoying variable jargain part 2
  var _id = new ObjectId(id);

  console.log("Begin EDIT for Question with ID " + id);

  try
  {
    // it gets worse every time I type it
    let update = {
      ...question != null ? {Question:question} : null,
      ...answer != null ? {Answer:answer} : null,
      ...wrongAnswers != null ? {WrongAnswers:wrongAnswers} : null,
      ...quizId != null ? {QuizId:quizId} : null,
    };

    const edit = {$set: update};

    const db = client.db("LargeProject");
    const result = await db.collection('Questions').updateOne({_id}, edit);

    if (result.matchedCount == 0)
    {
      error = 404;
    }

    var ret = {error:error};
  }
  catch(e)
  {
    error = e.toString();
    var ret = {error:e.message};
  }

  res.status(200).json(ret);
});

module.exports = questionsRouter;