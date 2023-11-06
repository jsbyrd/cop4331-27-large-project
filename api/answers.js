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
answersRouter.post("/get", async (req, res) => {
	let error = 200;

	const {questionId, quizId} = req.body;

	let getter = {
		...questionId != null ? {QuestionId:questionId} : null,
		...quizId != null ? {QuizId:quizId} : null
		};

  var projection = {
    projection: {QuestionId: 0, QuizId: 0}
  }

	console.log("Begin GET for Answer with Question ID " + questionId);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Answers').find(getter, projection).toArray();

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

// TODO: Add
// Add with a string
// Throw the question id in
answersRouter.post("/add", async (req, res) => {
	let error = 200;
	
	const {answer, questionId, wrong} = req.body;
	
	const newAnswer = {Answer:answer, QuestionId:questionId, WrongAnswer:wrong};
	
	console.log("Begin ADD for Answer with questionId " + questionId);
	
	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Answers').insertOne(newAnswer);
		
		var ret = {id:result.insertedId, error: error};
	}
	catch(e)
	{
		error = e.toString();
		var ret = {error:e.message};
	}
	
	res.status(200).json(ret);
});

// TODO: Edit
// Reference the quiz stuff with the ...
answersRouter.post("/edit", async (req, res) => {
	let error = 200;

	const {id, answer, wrong, questionId} = req.body;

	// some annoying variable jargain part 46246
	var _id = new ObjectId(id);

	console.log("Begin EDIT for Quiz with ID " + id);

	try
	{
		let update = {
		...questionId != null ? {QuestionId:questionId} : null,
		...answer != null ? {Answer:answer} : null,
		...wrong != null ? {WrongAnswer:wrong} : null
		};


		const edit = {$set: update};

		const db = client.db("LargeProject");
		const result = await db.collection('Answers').updateOne({_id}, edit);

		if (result.matchedCount == 0)
		{
		error = 204;
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

// TODO: Delete
answersRouter.delete("/delete", async (req, res) => {
	let error = 200;
  
	const {id} = req.body;
  var _id = new ObjectId(id);
	
	console.log("Begin DELETE for answer " + id);
	
	try
	{
		const db = client.db("LargeProject");

		const result = await db.collection('Answers').deleteOne({_id});
	
		if(result.deletedCount == 1)
		{
			console.log("Successfully deleted answer " + id);
		}
		else
		{
			error = 204;
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

module.exports = answersRouter;