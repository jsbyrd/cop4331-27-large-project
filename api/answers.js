const answersRouter = require("express").Router();
require("dotenv").config();

var ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

///////////////////
// API Endpoints //
///////////////////

// TODO: Get
// it's certainly being done
answersRouter.post("/get", async (req, res) => {
	let retCode = 200;
	let message = "";

	const {jwt, questionId} = req.body;

	var newId = new ObjectId(questionId);

	var projection = {projection: {QuestionId: 0}};

	console.log("Begin GET for Answer with Question ID " + questionId);

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
		const result = await db.collection('Answers').find({QuestionId: newId}, projection).toArray();

		if (result.length == 0)
			retCode = 204;

    	var ret = {result: result, error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}

	res.status(retCode).json(ret);
});

answersRouter.post("/getcorrect", async (req, res) => {
	let retCode = 200;
  	let message = "";

	const {jwt, questionId} = req.body;

	var newId = new ObjectId(questionId);

  	var projection = {projection: {QuestionId: 0, WrongAnswer: 0}}

	console.log("Begin GET CORRECT for Answer with Question ID " + questionId);

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
		const result = await db.collection('Answers').findOne({QuestionId: newId, WrongAnswer: false}, projection);

		if (result == null)
			retCode = 204;

    	var ret = {result: result, error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}

	res.status(retCode).json(ret);
});

// TODO: Add
// Add with a string
// Throw the question id in
answersRouter.post("/add", async (req, res) => {
	let retCode = 200;
	let message = "";
	
	const {jwt, answer, questionId, wrong} = req.body;

	var newId = new ObjectId(questionId);
	
	const newAnswer = {Answer: answer, QuestionId: newId, WrongAnswer: wrong};
	
	console.log("Begin ADD for Answer with questionId " + questionId);

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
		const result = await db.collection('Answers').insertOne(newAnswer);
		
		var ret = {id: result.insertedId, error: message};
	}
	catch(e)
	{
		retCode = 200;
		var ret = {retCode: e.message};
	}
	
	res.status(retCode).json(ret);
});

// TODO: Edit
// Reference the quiz stuff with the ...
answersRouter.post("/edit", async (req, res) => {
	let retCode = 200;
	let message = "";
	var newId;

	const {jwt, id, answer, wrong, questionId} = req.body;

	var _id = new ObjectId(id);
	if (questionId != null)
		var newId = new ObjectId(questionId);

	console.log("Begin EDIT for Quiz with ID " + id);

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
		let update = {
		...questionId != null ? {QuestionId: newId} : null,
		...answer != null ? {Answer: answer} : null,
		...wrong != null ? {WrongAnswer: wrong} : null
		};


		const edit = {$set: update};

		const db = client.db("LargeProject");
		const result = await db.collection('Answers').updateOne({_id}, edit);

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
answersRouter.post("/delete", async (req, res) => {
	let retCode = 200;
	let message = "";
  
	const {jwt, id} = req.body;
	var _id = new ObjectId(id);
	
	console.log("Begin DELETE for answer " + id);

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

		const result = await db.collection('Answers').deleteOne({_id});
	
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

module.exports = answersRouter;