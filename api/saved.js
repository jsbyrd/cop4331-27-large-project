const savedRouter = require("express").Router();
require("dotenv").config();

var ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

///////////////////
// API Endpoints //
///////////////////

// Get
// Incoming: id
// Outgoing: name, userId, error
savedRouter.post("/get", async (req, res) => {
	let retCode = 200;
	let message = "";

	const {id} = req.body;
	console.log("Begin GET for Saved Quiz with ID " + id);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Saved').find({UserId: id}).toArray();

		if (result.length == 0)
		{
			retCode = 204;

			var ret = {result: result, error: message};
		}
		else
		{
			var quizList = result.map((item) => {
				return {
					QuizId: item.QuizId,
					QuizName: item.QuizName,
				};
			});

			var ret = {result: quizList, error: message};
		}
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}

	res.status(retCode).json(ret);
});

// Add
// Incoming: userId, quizId
// Outgoing: id, error
savedRouter.post("/add", async (req, res) => {
	let retCode = 200;
  let message = "";

	const {userId, quizId} = req.body;

	const newQuiz = {UserId: userId, QuizId: quizId};

	console.log("Saving Quiz with userId " + userId + " and quizId " + quizId);

	try
	{
		var result;
		const db = client.db("LargeProject");

		if(userId == "" || quizId == "")
			retCode = 204;
		else
			result = await db.collection('Saved').insertOne(newQuiz);

		var ret = {result: result, error: message};
	}
	catch(e)
	{
		retCode = 404;
		var ret = {error: e.message};
	}

	res.status(retCode).json(ret);
});

// Delete
// Incoming: id
// Outgoing: name, userId, error
savedRouter.delete("/delete", async (req, res) => {
	let retCode = 200;
  let message = "";
  
	const {id} = req.body;
	
	console.log("Begin DELETE for Saved Quiz " + id);
	
	try
	{
		const db = client.db("LargeProject");

		const result = await db.collection('Saved').deleteOne({_id: id});
	
		if (result.deletedCount == 1)
			message = "Successfully deleted Saved Quiz " + id;
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

module.exports = savedRouter;