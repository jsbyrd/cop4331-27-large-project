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

	const {questionId} = req.body;

	console.log("Begin GET for Answer with Question ID " + questionId);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Answers').find({QuestionId: questionId}, projection).toArray();

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

	const {questionId, quizId} = req.body;

  var projection = {projection: {QuestionId: 0, WrongAnswer: 0}}

	console.log("Begin GET CORRECT for Answer with Question ID " + questionId);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Answers').findOne({QuestionId: questionId}, projection);

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
	
	const {answer, questionId, wrong} = req.body;
	
	const newAnswer = {Answer: answer, QuestionId: questionId, WrongAnswer: wrong};
	
	console.log("Begin ADD for Answer with questionId " + questionId);
	
	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Answers').insertOne(newAnswer);
		
		var ret = {id: result.insertedId, retCode: retCode};
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

	const {id, answer, wrong, questionId} = req.body;

	// some annoying variable jargain part 46246
	var _id = new ObjectId(id);

	console.log("Begin EDIT for Quiz with ID " + id);

	try
	{
		let update = {
		...questionId != null ? {QuestionId: questionId} : null,
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
answersRouter.delete("/delete", async (req, res) => {
	let retCode = 200;
  let message = "";
  
	const {id} = req.body;
  var _id = new ObjectId(id);
	
	console.log("Begin DELETE for answer " + id);
	
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