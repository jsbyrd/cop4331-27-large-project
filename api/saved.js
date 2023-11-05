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
	let error = 200;

	const {id} = req.body;

	// some annoying variable jargon
	var _id = new ObjectId(id);

	console.log("Begin GET for Saved Quiz with ID" + id);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Saved').find({_id}).toArray();

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
// Incoming: userId, quizId
// Outgoing: id, error
savedRouter.post("/add", async (req, res) => {
	let error = 200;

	const {userId, quizId} = req.body;

	const newQuiz = {UserId:userId, QuizId:quizId};

	console.log("Saving Quiz with userId " + userId + " and quizId " + quizId);

	try
	{
		const db = client.db("LargeProject");
		const result = await db.collection('Saved').insertOne(newQuiz);

		if(userId == "" || quizId == "")
			error = "You have a blank field somewhere. No saved quiz for you!";

		var ret = {result:result, error:error};
	}
	catch(e)
	{
		error = e.toString();
		var ret = {error:e.message};
	}

	res.status(200).json(ret);
});

module.exports = savedRouter;