const { Console } = require("console");

const questionsRouter = require("express").Router();
require("dotenv").config();
const token = require("./jwt.js");

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
  let retCode = 200;
  let message = "";
  
  const {jwt, term, quizId} = req.body;

  var newId = new ObjectId(quizId);
  
  console.log("Begin Search for Question with Quiz ID " + quizId);

  // check if the jwt was given
	if (jwt == null)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	// this calls ./jwt.js
	const notValid = token.verify(jwt);

	// final validation check
	if (notValid)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}
  
  // more silly nodejs jargain
  var search = {
    $and: [{QuizId: newId}],
    $or: [{
      Question: { $regex: term, $options: "i"}
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
      retCode = 204;
    
	  console.log(result);
    var ret = {result: result, error: message};
  }
  catch(e)
  {
    retCode = 404;
    var ret = {error: e.message};
  }
  
  console.log(ret);
  res.status(retCode).json(ret);
});

// Add
// Incoming: question, quizId
// Outgoing: id, error
questionsRouter.post("/add", async (req, res) => {
	let retCode = 200;
	let message = "";
	
	const {question, quizId} = req.body;

	var newId = new ObjectId(quizId);
	
	const newQuestion = {Question: question, QuizId: newId};
	
	console.log("Begin ADD for Question with quizId " + quizId);
	
	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Questions').insertOne(newQuestion);
		
		var ret = {id: result.insertedId, error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}
	
	res.status(retCode).json(ret);
});

// Edit
// Incoming: id (required), question, quizId (optional; only input what's edited)
// Outgoing: error
questionsRouter.post("/edit", async (req, res) => {
	let retCode = 200;
	let message = "";
	var newId;

	const {jwt, id, question, quizId} = req.body;

	// some annoying variable jargain part 2
	var _id = new ObjectId(id);

	if (quizId != null)
		newId = new ObjectId(quizId);

	console.log("Begin EDIT for Question with ID " + id);

	// check if the jwt was given
	if (jwt == null)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	// this calls ./jwt.js
	const notValid = token.verify(jwt);

	// final validation check
	if (notValid)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	try
	{
		// it gets worse every time I type it
		let update = {
		...question != null ? {Question: question} : null,
		...quizId != null ? {QuizId: newId} : null,
		};

		const edit = {$set: update};

		const db = client.db("LargeProject");
		const result = await db.collection('Questions').updateOne({_id}, edit);

		if (result.matchedCount == 0)
			retCode = 204;

		var ret = {error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}

	res.status(retCode).json(ret);
});

// TODO: Delete
questionsRouter.post("/delete", async (req, res) => {
	let retCode = 200;
	let message = "";
  
	const {jwt, id} = req.body;
	var _id = new ObjectId(id);
	
	console.log("Begin DELETE for question " + id);

	// check if the jwt was given
	if (jwt == null)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}

	// this calls ./jwt.js
	const notValid = token.verify(jwt);

	// final validation check
	if (notValid)
	{
		res.status(403).json({error: "No valid token given"});
		return;
	}
	
	try
	{
		const db = client.db("LargeProject");

		const result = await db.collection('Questions').deleteOne({_id});
	
		if(result.deletedCount == 1)
			message = "Successfully deleted answer " + id;
		else
			retCode = 204;

	var ret = {error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}
	
	
	res.status(retCode).json(ret);
});

module.exports = questionsRouter;
